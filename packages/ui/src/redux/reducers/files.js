import unionBy from 'lodash/fp/unionBy';
import {
  INIT_FILES,
  CHANGE_FILE_TEXT,
  BUILD_FINISHED,
  NEW_FILE_CREATED,
  FILE_RENAMED,
  FILE_DELETED
} from '../actionTypes';

export const files = (state = [], action) => {
  switch (action.type) {
    case INIT_FILES:
      return action.files;
    case CHANGE_FILE_TEXT:
      return state.map(file => (
        file.name === action.fileName
          ? Object.assign({}, file, { text: action.text })
          : file
      ));
    case BUILD_FINISHED:
      return unionBy(file => file.name)(action.files)(state);
    case NEW_FILE_CREATED:
      const newFile = { name: action.fileName, text: '' };
      return unionBy(file => file.name)([newFile])(state);
    case FILE_RENAMED:
      return state.map(file => (
        file.name === action.oldFileName
          ? Object.assign(file, { name: action.newFileName })
          : file
      ));
    case FILE_DELETED:
      return state.filter(file => file.name !== action.fileName)
    default:
      return state;
  }
};
