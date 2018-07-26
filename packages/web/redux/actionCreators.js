import {
  START_BUILD,
  BUILD_FINISHED
} from './actionTypes';

export const startBuild = () => ({
  type: START_BUILD
});

export const buildFinished = files => ({
  type: BUILD_FINISHED,
  files
});
