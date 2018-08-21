import { SET_CSRF_TOKEN, SET_VISUALIZATION } from './actionTypes';
import { uiRedux } from 'vizhub-ui';

const { actionTypes: { SAVE_ERROR } } = uiRedux;

export const csrfToken = (state = null, action) => {
  switch (action.type) {
    case SET_CSRF_TOKEN:
      return action.csrfToken || null;
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

export const showForkInvitation = (state = false, action) => {
  switch (action.type) {
    case SAVE_ERROR:
      return true;
    default:
      return state;
  }
};
