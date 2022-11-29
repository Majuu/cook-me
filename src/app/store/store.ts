import {createStore} from 'redux';
import combinedReducer from './reducers/index';

export const store = createStore(combinedReducer);
