import { combineReducers } from 'redux';
import { reducers } from 'vizhub-ui';
import { START_BUILD, BUILD_FINISHED } from './actionTypes';

const { ide } = reducers;
const uiReducer = combineReducers({ ide });

const appReducer = (state, action) => {
  switch (action.type) {
    case BUILD_FINISHED:
      //return Object.assign({}, state, {
      //  ide: Object.assign({}, state.ide, {
      //    files: state.ide.files
      //      //.filter(file => action.files.filter(({name}) => name === file.name).length)
      //      .concat(action.files);
      //  })
      //});
    default:
      return state;
  }
};

export const rootReducer = (state, action) => {
  state = uiReducer(state, action);
  state = appReducer(state, action);
  return state;
};
