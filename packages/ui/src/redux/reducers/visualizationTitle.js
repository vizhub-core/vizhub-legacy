import { SET_VISUALIZATION_TITLE } from '../actionTypes';

export const visualizationTitle = (state = '', action) => {
  switch (action.type) {
    case SET_VISUALIZATION_TITLE:
      return action.title;
    default:
      return state;
  }
};
