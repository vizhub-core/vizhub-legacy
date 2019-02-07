import { SET_VISUALIZATION_DESCRIPTION } from '../actionTypes';

export const visualizationDescription = (state = '', action) => {
  switch (action.type) {
    case SET_VISUALIZATION_DESCRIPTION:
      return action.description;
    default:
      return state;
  }
};
