import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './reducers/recipesSlice';
import instructionsReducer from './reducers/instructionsSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    instructions: instructionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
