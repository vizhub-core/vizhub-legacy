import { SET_ACTIVE_FILE, FILE_RENAMED, FILE_DELETED } from '../actionTypes';

export const activeFileName = (state = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_FILE:
      return action.fileName;
    case FILE_RENAMED:
      if (state === action.oldFileName) {
        return action.newFileName;
      }
      break;
    case FILE_DELETED:
      if (state === action.fileName) {
        return 'index.html';
      }
      break;
    default:
      return state;
  }
};
