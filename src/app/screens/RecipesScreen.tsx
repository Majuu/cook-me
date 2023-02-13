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
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {modalActions} from '../store/actions/modal.actions';
import {Dispatch} from 'redux';
import {ColorsEnum} from '../enums/colors.enum';
import RecipesListItem from '../components/RecipesList/RecipeListItem';
import RecipeListNavbar from '../components/RecipesList/RecipeListNavbar';
import {getAllRecipes, getFavouritesRecipes} from '../services/dataApi';
import {recipeActions} from '../store/actions/recipe.actions';
import {useNavigation, useRoute} from '@react-navigation/native';
import { ScreensEnum } from '../enums/screens.enum';
import { Recipe } from '../interfaces/recipe.interface';

interface AllRecipesScreenProps {
  modal: boolean;
  dispatch: Dispatch;
  allRecipes: Recipe[];
  favouriteRecipes: Recipe[];
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
  dispatch,
  allRecipes,
  favouriteRecipes,
}: AllRecipesScreenProps): React.ReactElement => {
  const [itemInModal, setItemInModal] = useState<any>(null);
  const [searchItem, setSearchItem] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('all');
  const route: Route = useRoute();
  const navigation: Route = useNavigation();

  //ToDo check typing
  // @ts-ignore
  const isFavouriteRecipesScreen: boolean =
    route.params && route.params.isMyRecipes;

  const setSearchedItem = useCallback(
    (inputValue: string) => {
      setSearchItem(inputValue);
    },
    [setSearchItem],
  );

  const setSearchedCategory = useCallback(
    (categoryValue: string) => {
      setSearchCategory(categoryValue);
    },
    [setSearchCategory],
  );

  const itemsToGenerate: Recipe[] = useMemo(() => {
    const recipes: Recipe[] = isFavouriteRecipesScreen
      ? favouriteRecipes
      : allRecipes;
    const recipesFilteredByCategory: Recipe[] =
      searchCategory !== 'all'
        ? recipes.filter(
            (recipe: Recipe) =>
              recipe.category.toLowerCase() === searchCategory,
          )
        : recipes;

    if (searchItem.length > 0) {
      return recipesFilteredByCategory.filter((recipeItem: Recipe) =>
        recipeItem.title.toLowerCase().includes(searchItem.toLowerCase()),
      );
    } else {
      return recipesFilteredByCategory;
    }
  }, [
    isFavouriteRecipesScreen,
    allRecipes,
    favouriteRecipes,
    searchItem,
    searchCategory,
  ]);

  const setAllRecipes = async () => {
    const result = await getAllRecipes();
    if (result) {
      dispatch({
        type: recipeActions.SET_ALL_RECIPES,
        payload: result,
      });
    }
  };

  const setFavouriteRecipes = async () => {
    const result = await getFavouritesRecipes();
    if (result) {
      dispatch({
        type: recipeActions.SET_FAVOURITE_RECIPES,
        payload: result,
      });
    }
  };

  useEffect(() => {
    if (isFavouriteRecipesScreen) {
      setFavouriteRecipes();
    } else {
      setAllRecipes();
    }
  });

  const openModal = (): any =>
    dispatch({
      type: modalActions.SHOW_RECIPE_MODAL,
    });

  const handleModalOpen = (item: Recipe) => {
    setItemInModal(item);
    openModal();
  };

  const navigateToRecipeDetails = useCallback((item: any) => {
    navigation.navigate(ScreensEnum.RECIPE_DETAILS, {recipe: item});
  }, []);

  return (
    <View style={styles.container}>
      <RecipeListNavbar
        setSearchItem={setSearchedItem}
        searchItem={searchItem}
        searchCategory={searchCategory}
        setSearchCategory={setSearchedCategory}
      />
      <FlatList
        style={styles.itemList}
        data={itemsToGenerate}
        renderItem={(
          recipe: ListRenderItemInfo<Recipe>,
        ): ReactElement => (
          <RecipesListItem
            item={recipe.item}
            key={recipe.item.title}
            onPress={() => navigateToRecipeDetails(recipe.item)}
            setAllRecipes={setAllRecipes}
            setFavouriteRecipes={setFavouriteRecipes}
          />
        )}
        keyExtractor={(item: Recipe): string => item.title}
      />
      {/* {itemInModal && <CustomModal item={itemInModal} />} */}
    </View>
  );
};

export default connect((state: any): any => ({
  modal: state.modal.isModalVisible,
  allRecipes: state.recipe.allRecipes,
  favouriteRecipes: state.recipe.favouriteRecipes,
}))(RecipesScreen);
