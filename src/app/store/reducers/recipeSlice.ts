import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Recipe } from '../../interfaces/recipe.interface';

export interface RecipesState {
  recipeList: Recipe[];
  favouritesRecipes: Recipe[];
}

const initialState: RecipesState = {
  recipeList: [],
  favouritesRecipes: []
}

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    updateAllRecipes: (state, action: PayloadAction<Recipe[]>) => {
        state.recipeList = action.payload;
        console.log('all recipes', state.recipeList);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    //   state.value += 1
    },
    updateFavourites: (state, action: PayloadAction<Recipe[]>) => {
        state.favouritesRecipes = action.payload;
        console.log('favourite recipes', state.favouritesRecipes);

    //   state.value -= 1
    }
  },
})

export const { updateAllRecipes, updateFavourites } = recipeSlice.actions;

export default recipeSlice.reducer