import { SET_CSRF_TOKEN, SET_VISUALIZATION } from './actionTypes';

export const csrfToken = (state = null, action) => {
  switch (action.type) {
    case SET_CSRF_TOKEN:
      return action.csrfToken;
    default:
      return state;
  }
};

export const visualization = (state = null, action) => {
  switch (action.type) {
    case SET_VISUALIZATION:
      return action.visualization;
    default:
      return state;
  }
};
