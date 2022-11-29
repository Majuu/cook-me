import {modalActions} from '../actions/modal.actions';

const initialState = {
    isModalVisible: false
};

const modalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case modalActions.SHOW_RECIPE_MODAL:
            return {
                ...state,
                isModalVisible: true
            };
        case modalActions.HIDE_RECIPE_MODAL:
            return {
                ...state,
                isModalVisible: false
            };
        default:
            return {
                ...state
            };
    }
};

export default {
    modalReducer,
    initialState
};
