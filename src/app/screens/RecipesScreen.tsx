import React, {
  FunctionComponent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Route,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ColorsEnum} from '../enums/colors.enum';
import RecipesListItem from '../components/RecipesList/RecipeListItem';
import RecipeListNavbar from '../components/RecipesList/RecipeListNavbar';
import {getAllRecipes, getFavouriteRecipes} from '../services/dataApi';
import {recipeActions} from '../store/actions/recipe.actions';
import {useNavigation, useRoute} from '@react-navigation/native';
import { ScreensEnum } from '../enums/screens.enum';
import { Recipe } from '../interfaces/recipe.interface';
import { RootState } from '../store/store';
import { updateAllRecipes, updateFavourites } from '../store/reducers/recipeSlice';

interface AllRecipesScreenProps {
  modal: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemList: {
    backgroundColor: ColorsEnum.GREEN,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 2,
  },
});

const RecipesScreen: FunctionComponent<AllRecipesScreenProps> = ({
}: AllRecipesScreenProps): React.ReactElement => {
  // const [itemInModal, setItemInModal] = useState<any>(null);
  // const [searchItem, setSearchItem] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('all');
  const route: Route = useRoute();
  const navigation: Route = useNavigation();
  const allRecipes = useSelector((state: RootState) => state.recipes.recipeList);
  const favouriteRecipes = useSelector((state: RootState) => state.recipes.favouritesRecipes);
  const dispatch = useDispatch();

    //ToDo check typing
  // @ts-ignore
  const isFavouriteRecipesScreen: boolean =
    route.params && route.params.isMyRecipes;

  useEffect(() => {
    if(!isFavouriteRecipesScreen && !allRecipes.length) {
      updateAllRecipesList();
    }

    if(isFavouriteRecipesScreen && !favouriteRecipes.length) {
      updateFavouriteRecipesList();
    }
  }, [])

  const updateAllRecipesList = async (): Promise<void> => {
    try {
      const recipeList = await getAllRecipes();
      if (recipeList) {
        dispatch(updateAllRecipes(recipeList));
      }
    } catch (e) {
      console.log(e)
    }
  }

  const updateFavouriteRecipesList = async (): Promise<void> => {
    try {
      const recipeList = await getFavouriteRecipes();
      if (recipeList) {
        dispatch(updateFavourites(recipeList));
      }
    } catch (e) {
      console.log(e)
    }
  }
// =========================================================
  // const setSearchedItem = useCallback(
  //   (inputValue: string) => {
  //     setSearchItem(inputValue);
  //   },
  //   [setSearchItem],
  // );

  // const setSearchedCategory = useCallback(
  //   (categoryValue: string) => {
  //     setSearchCategory(categoryValue);
  //   },
  //   [setSearchCategory],
  // );

  // const itemsToGenerate: Recipe[] = useMemo(() => {
  //   const recipes: Recipe[] = isFavouriteRecipesScreen
  //     ? favouriteRecipes
  //     : allRecipes;
  //   const recipesFilteredByCategory: Recipe[] =
  //     searchCategory !== 'all'
  //       ? recipes.filter(
  //           (recipe: Recipe) =>
  //             recipe.category.toLowerCase() === searchCategory,
  //         )
  //       : recipes;

  //   if (searchItem.length > 0) {
  //     return recipesFilteredByCategory.filter((recipeItem: Recipe) =>
  //       recipeItem.title.toLowerCase().includes(searchItem.toLowerCase()),
  //     );
  //   } else {
  //     return recipesFilteredByCategory;
  //   }
  // }, [
  //   isFavouriteRecipesScreen,
  //   allRecipes,
  //   favouriteRecipes,
  //   searchItem,
  //   searchCategory,
  // ]);

  // const openModal = (): any =>
  //   dispatch({
  //     type: modalActions.SHOW_RECIPE_MODAL,
  //   });

  // const handleModalOpen = (item: Recipe) => {
  //   setItemInModal(item);
  //   openModal();
  // };

  const navigateToRecipeDetails = useCallback((item: any) => {
    navigation.navigate(ScreensEnum.RECIPE_DETAILS, {recipe: item});
  }, []);

  return (
    <View style={styles.container}>
      {/* <RecipeListNavbar
        setSearchItem={setSearchedItem}
        searchItem={searchItem}
        searchCategory={searchCategory}
        setSearchCategory={setSearchedCategory}
      /> */}
      <FlatList
        style={styles.itemList}
        // data={itemsToGenerate}
        data={isFavouriteRecipesScreen ? favouriteRecipes : allRecipes}
        renderItem={(
          recipe: ListRenderItemInfo<Recipe>,
        ): ReactElement => (
          <RecipesListItem
            item={recipe.item}
            key={recipe.item.title}
            onPress={() => navigateToRecipeDetails(recipe.item)}
            // setAllRecipes={setAllRecipes}
            // setFavouriteRecipes={setFavouriteRecipes}
          />
        )}
        keyExtractor={(item: Recipe): string => item.title}
      />
      {/* {itemInModal && <CustomModal item={itemInModal} />} */}
    </View>
  );
};

export default RecipesScreen;
