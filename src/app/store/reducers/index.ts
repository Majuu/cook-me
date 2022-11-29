import {combineReducers} from 'redux';
import modal from './modal.reducer';
import recipe from './recipe.reducer';
import recipeList from './recipeList.reducer';

const appReducer = combineReducers({
    modal: modal.modalReducer,
    recipe: recipe.recipeReducer,
    recipeList: recipeList.recipeListReducer
});

export default (state: any, action: any): any => appReducer(state, action);
