import { SET_VISUALIZATION_HEIGHT } from '../actionTypes';

export const visualizationHeight = (state = -1, action) => {
  switch (action.type) {
    case SET_VISUALIZATION_HEIGHT:
      return action.height;
    default:
      return state;
  }
};
