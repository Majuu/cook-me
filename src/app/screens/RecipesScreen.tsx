import React, {
  FunctionComponent,
  ReactElement,
  useCallback,
  useEffect,
} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Route,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ColorsEnum} from '../enums/colors.enum';
import RecipesListItem from '../components/RecipesList/RecipeListItem';
import {useNavigation, useRoute} from '@react-navigation/native';
import { ScreensEnum } from '../enums/screens.enum';
import { Recipe } from '../interfaces/recipe.interface';
import { RootState } from '../store/store';
import { fetchAllRecipes, fetchFavouriteRecipes } from '../store/reducers/recipeSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';

interface AllRecipesScreenProps {
  modal: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemList: {
    backgroundColor: ColorsEnum.GREEN,
  },
});

const RecipesScreen: FunctionComponent<AllRecipesScreenProps> = ({
}: AllRecipesScreenProps): React.ReactElement => {
  const route: Route = useRoute();
  const navigation: Route = useNavigation();
  const allRecipes = useSelector((state: RootState) => state.recipes.recipeList);
  const favouriteRecipes = useSelector((state: RootState) => state.recipes.favouritesRecipes);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();
  const isFavouriteRecipesScreen: boolean =
    route.name === ScreensEnum.MY_RECIPES;

  useEffect(() => {
    if(!isFavouriteRecipesScreen && !allRecipes.length) {
      dispatch(fetchAllRecipes())
    }

    if(isFavouriteRecipesScreen && !favouriteRecipes.length) {
      dispatch(fetchFavouriteRecipes());
    }
  }, [])

  const navigateToRecipeDetails = useCallback((item: any) => {
    navigation.navigate(ScreensEnum.RECIPE_DETAILS, {recipe: item});
  }, [navigation]);

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
        data={isFavouriteRecipesScreen ? favouriteRecipes : allRecipes}
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
