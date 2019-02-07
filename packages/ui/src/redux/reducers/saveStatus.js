import {
  CHANGE_FILE_TEXT,
  SAVE,
  SAVE_SUCCESS,
  SAVE_ERROR,
  SET_VISUALIZATION_HEIGHT
} from '../actionTypes';

export const saveStatus = (state = 'Saved', action) => {
  switch (action.type) {
    case SAVE:
      return 'Saving';
    case SAVE_SUCCESS:
      return 'Saved';
    case SAVE_ERROR:
      return action.error;
    case CHANGE_FILE_TEXT:
      return '';
    case SET_VISUALIZATION_HEIGHT:
      return '';
    default:
      return state;
  }
};
