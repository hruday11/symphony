import  thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './Reducers/index';

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));