import { uiRedux } from 'vizhub-ui';
const { actionTypes: { BUILD_FINISHED } } = uiRedux;

import {
  START_BUILD,
  BUILD_ERROR,
  SET_CSRF_TOKEN,
  SET_VISUALIZATION,
  FORK_VISUALIZATION
} from './actionTypes';

export const startBuild = () => ({
  type: START_BUILD
});

// TODO move into ui package
export const buildFinished = files => ({
  type: BUILD_FINISHED,
  files
});

export const buildError = error => ({
  type: BUILD_ERROR,
  message: error.message
});

export const setCsrfToken = csrfToken => ({
  type: SET_CSRF_TOKEN,
  csrfToken
});

export const setVisualization = visualization => ({
  type: SET_VISUALIZATION,
  visualization
});

export const forkVisualization = () => ({
  type: FORK_VISUALIZATION
});
