import { combineReducers } from 'redux';
import { reducers, selectors } from 'vizhub-ui';
import { START_BUILD, BUILD_FINISHED } from './actionTypes';
import set from 'lodash/fp/set';
import unionBy from 'lodash/fp/unionBy';

const { ide } = reducers;
const { getFiles } = selectors;

const uiReducer = combineReducers({ ide });

const appReducer = (state, action) => {
  switch (action.type) {
    case BUILD_FINISHED:
      return set('ide.files')
        (
          unionBy(file => file.name)
            (action.files)
            (getFiles(state))
        )
        (state);
    default:
      return state;
  }
};

export const rootReducer = (state, action) => {
  state = uiReducer(state, action);
  return appReducer(state, action);
};
