import {
  INIT_FILES,
  CHANGE_FILE_TEXT,
  SET_ACTIVE_FILE,
  SAVE,
  SET_VISUALIZATION_WIDTH,
  SET_VISUALIZATION_HEIGHT
} from './actionTypes';

export const initFiles = files => ({
  type: INIT_FILES,
  files
});

export const changeFileText = (fileName, text) => ({
  type: CHANGE_FILE_TEXT,
  fileName,
  text
});

export const setActiveFile = fileName => ({
  type: SET_ACTIVE_FILE,
  fileName
});

export const save = () => ({
  type: SAVE
});

export const setVisualizationWidth = width => ({
  type: SET_VISUALIZATION_WIDTH,
  width
});

export const setVisualizationHeight = height => ({
  type: SET_VISUALIZATION_HEIGHT,
  height
});
