import {
  INIT_FILES,
  CHANGE_FILE_TEXT,
  SET_ACTIVE_FILE,
  SAVE,
  SAVE_SUCCESS,
  SAVE_ERROR,
  SET_HEIGHT_PROMPT,
  SET_VISUALIZATION_WIDTH,
  SET_VISUALIZATION_HEIGHT,
  SET_VISUALIZATION_TITLE,
  SET_VISUALIZATION_ID,
  SET_VISUALIZATION_DESCRIPTION,
  SET_VISUALIZATION_OWNER_USER,
  RUN_FILES,
  CREATE_NEW_FILE,
  NEW_FILE_CREATED,
  RENAME_FILE,
  FILE_RENAMED,
  DELETE_FILE,
  FILE_DELETED,
  FORK_VISUALIZATION,
  FORK_ERROR,
  FORK_SUCCESS,
  SPLIT_PANE_DRAG_STARTED,
  SPLIT_PANE_DRAG_FINISHED,
  DELETE_VISUALIZATION,
  VISUALIZATION_DELETED
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

export const runFiles = () => ({
  type: RUN_FILES
});

export const saveSuccess = () => ({
  type: SAVE_SUCCESS
});

export const saveError = error => ({
  type: SAVE_ERROR,
  error
});

export const createNewFile = () => ({
  type: CREATE_NEW_FILE
});

export const newFileCreated = fileName => ({
  type: NEW_FILE_CREATED,
  fileName
});

export const renameFile = fileName => ({
  type: RENAME_FILE,
  fileName
});

export const fileRenamed = (oldFileName, newFileName) => ({
  type: FILE_RENAMED,
  oldFileName,
  newFileName
});

export const deleteFile = fileName => ({
  type: DELETE_FILE,
  fileName
});

export const fileDeleted = fileName => ({
  type: FILE_DELETED,
  fileName
});

export const forkVisualization = () => ({
  type: FORK_VISUALIZATION
});

export const forkSuccess = (id, userName) => ({
  type: FORK_SUCCESS,
  id,
  userName
});

export const forkError = () => ({
  type: FORK_ERROR
});

export const setTitle = title => ({
  type: SET_VISUALIZATION_TITLE,
  title
});

export const setVisualizationId = id => ({
  type: SET_VISUALIZATION_ID,
  id
});

export const setVisualizationOwnerUser = user => ({
  type: SET_VISUALIZATION_OWNER_USER,
  user
});

export const setDescription = description => ({
  type: SET_VISUALIZATION_DESCRIPTION,
  description
});

export const splitPaneDragStarted = () => ({
  type: SPLIT_PANE_DRAG_STARTED
});

export const splitPaneDragFinished = () => ({
  type: SPLIT_PANE_DRAG_FINISHED
});

export const setHeightPrompt = () => ({
  type: SET_HEIGHT_PROMPT
});

export const deleteVisualization = () => ({
  type: DELETE_VISUALIZATION
});

export const visualizationDeleted = () => ({
  type: VISUALIZATION_DELETED
});
