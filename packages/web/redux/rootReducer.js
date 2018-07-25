import { combineReducers } from 'redux';
import { reducers } from 'vizhub-ui';

const { ide } = reducers;

export const rootReducer = combineReducers({ ide });
