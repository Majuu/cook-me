import React, {
  FunctionComponent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Route,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {ColorsEnum} from '../enums/colors.enum';
import RecipesListItem from '../components/RecipesList/RecipeListItem';
import {useNavigation, useRoute} from '@react-navigation/native';
import { ScreensEnum } from '../enums/screens.enum';
import { Recipe } from '../interfaces/recipe.interface';
import { RootState } from '../store/store';
import { fetchAllRecipes, fetchFavouriteRecipes } from '../store/reducers/recipeSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import RecipeListNavbar from '../components/RecipesList/RecipeListNavbar';
import { RecipeCategories } from '../enums/recipe-categories.enum';
import { useRecipeList } from '../hooks/recipeList';

interface AllRecipesScreenProps {
  modal: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemList: {
    backgroundColor: ColorsEnum.GREEN,
  }
});

const RecipesScreen: FunctionComponent<AllRecipesScreenProps> = ({
}): React.ReactElement => {
  const route: Route = useRoute();
  const navigation: Route = useNavigation();
  const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();
  const isAllRecipesScreen: boolean =
    route.name === ScreensEnum.RECIPE_LIST;
  const [searchItem, setSearchedItem] = useState('');
  const [searchedCategory, setSearchedCategory] = useState<RecipeCategories>();
  const currentRecipes = useRecipeList(isAllRecipesScreen, searchedCategory, searchItem);

  useEffect(() => {
    if(isAllRecipesScreen && !currentRecipes.length) {
      dispatch(fetchAllRecipes())
    }

    if(!isAllRecipesScreen && !currentRecipes.length) {
      dispatch(fetchFavouriteRecipes());
    }
  }, [])

  const navigateToRecipeDetails = useCallback((item: any) => {
    navigation.navigate(ScreensEnum.RECIPE_DETAILS, {recipe: item});
  }, [navigation]);

  return (
    <View style={styles.container}>
      <RecipeListNavbar
        setSearchItem={setSearchedItem}
        searchItem={searchItem}
        setSearchCategory={setSearchedCategory}
      />
      <FlatList
        style={styles.itemList}
        data={currentRecipes}
        renderItem={(
          recipe: ListRenderItemInfo<Recipe>,
        ): ReactElement => (
          <RecipesListItem
            item={recipe.item}
            key={recipe.item.id}
            onPress={() => navigateToRecipeDetails(recipe.item)}
          />
        )}
        keyExtractor={(item: Recipe): string => item.title}
      />
    </View>
  );
};

export default RecipesScreen;
