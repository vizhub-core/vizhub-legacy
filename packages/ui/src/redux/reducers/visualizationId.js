import { SET_VISUALIZATION_ID } from '../actionTypes';

export const visualizationId = (state = '', action) => {
  switch (action.type) {
    case SET_VISUALIZATION_ID:
      return action.id;
    default:
      return state;
  }
};
