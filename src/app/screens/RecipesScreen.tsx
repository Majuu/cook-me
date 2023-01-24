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
import {RecipeListItem} from '../interfaces/recipe.interface';
import {ColorsEnum} from '../enums/colors.enum';
import RecipesListItem from '../components/RecipesList/RecipeListItem';
import RecipeListNavbar from '../components/RecipesList/RecipeListNavbar';
import CustomModal from '../components/shared/CustomModal';
import {getAllRecipes, getFavouritesRecipes} from '../services/dataApi';
import {recipeActions} from '../store/actions/recipe.actions';
import {useRoute} from '@react-navigation/native';

interface AllRecipesScreenProps {
  modal: boolean;
  dispatch: Dispatch;
  allRecipes: RecipeListItem[];
  favouriteRecipes: RecipeListItem[];
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

  const itemsToGenerate: RecipeListItem[] = useMemo(() => {
    const recipes: RecipeListItem[] = isFavouriteRecipesScreen
      ? favouriteRecipes
      : allRecipes;
    const recipesFilteredByCategory: RecipeListItem[] =
      searchCategory !== 'all'
        ? recipes.filter(
            (recipe: RecipeListItem) =>
              recipe.category.toLowerCase() === searchCategory,
          )
        : recipes;

    if (searchItem.length > 0) {
      return recipesFilteredByCategory.filter((recipeItem: RecipeListItem) =>
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

  const handleModalOpen = (item: RecipeListItem) => {
    setItemInModal(item);
    openModal();
  };

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
          recipe: ListRenderItemInfo<RecipeListItem>,
        ): ReactElement => (
          <RecipesListItem
            item={recipe.item}
            key={recipe.item.title}
            onPress={(): void => handleModalOpen(recipe.item)}
            setAllRecipes={setAllRecipes}
            setFavouriteRecipes={setFavouriteRecipes}
          />
        )}
        keyExtractor={(item: RecipeListItem): string => item.title}
      />
      {itemInModal && <CustomModal item={itemInModal} />}
    </View>
  );
};

export default connect((state: any): any => ({
  modal: state.modal.isModalVisible,
  allRecipes: state.recipe.allRecipes,
  favouriteRecipes: state.recipe.favouriteRecipes,
}))(RecipesScreen);
