import {recipeListActions} from '../actions/recipeList.actions';

const initialState = {
    userList: []
};

const recipeListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case recipeListActions.ADD_TO_USER_LIST:
            return {
                ...state,
                userList: [...state.userList, action.payload]
            };
        case recipeListActions.REMOVE_FROM_USER_LIST:
            return {
                ...state,
                userList: state.userList.filter((item: any) =>
                    item !== action.payload
                )
            };
        default:
            return {
                ...state
            };
    }
};

export default {
    recipeListReducer,
    initialState
};
