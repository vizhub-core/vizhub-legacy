import { SET_VISUALIZATION_OWNER_USER } from '../actionTypes';

export const visualizationOwnerUser = (state = {}, action) => {
  switch (action.type) {
    case SET_VISUALIZATION_OWNER_USER:
      return action.user;
    default:
      return state;
  }
};
