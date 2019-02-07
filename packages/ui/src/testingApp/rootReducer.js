import { combineReducers } from 'redux';
import { uiRedux } from '../exports';

const {
  reducers: {
    ide
  }
} = uiRedux;

export const rootReducer = combineReducers({ ide });
