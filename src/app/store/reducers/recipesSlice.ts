import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Recipe } from '../../interfaces/recipe.interface';
import { getAllRecipes, getFavouriteRecipes } from '../../services/dataApi';

export interface RecipesState {
  recipeList: Recipe[];
  favouritesRecipes: Recipe[];
}

const initialState: RecipesState = {
  recipeList: [],
  favouritesRecipes: []
}

export const fetchAllRecipes = createAsyncThunk('recipes/getAll', 
    async () => {
        const response = await getAllRecipes();
        return response;
})

export const fetchFavouriteRecipes = createAsyncThunk('recipes/getFavourites', 
    async () => {
        const response = await getFavouriteRecipes();
        return response;
})

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
      builder.addCase(fetchAllRecipes.fulfilled, (state, action) => {
        state.recipeList = action.payload;
      }),
      builder.addCase(fetchFavouriteRecipes.fulfilled, (state, action) => {
        state.favouritesRecipes = action.payload;
      })
  },
})

export const { } = recipesSlice.actions;

export default recipesSlice.reducer