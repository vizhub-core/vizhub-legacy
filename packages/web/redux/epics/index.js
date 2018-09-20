import { uiRedux } from 'vizhub-ui';
import { combineEpics } from 'redux-observable';
import { saveEpic } from './saveEpic';
import { startBuildEpic } from './startBuildEpic';
import { buildEpic } from './buildEpic';
import { runBuildEpic } from './runBuildEpic';
import { runNonJSEpic } from './runNonJS';
import { forkEpic } from './forkEpic';
import { forkSuccessEpic } from './forkSuccessEpic';

const {
  epics: {
    autoSaveEpic,
    promptForNewFileNameEpic,
    promptForNewHeightEpic,
    promptForRenameEpic,
    confirmDeleteEpic,
    updateTitleEpic,
    updateDescriptionEpic,
  }
} = uiRedux;

export const rootEpicForBrowser = combineEpics(
  startBuildEpic,
  buildEpic,
  runBuildEpic,
  runNonJSEpic,
  autoSaveEpic,
  saveEpic,
  promptForNewFileNameEpic,
  promptForNewHeightEpic,
  promptForRenameEpic,
  confirmDeleteEpic,
  forkEpic,
  forkSuccessEpic,
  updateTitleEpic,
  updateDescriptionEpic,
);

export const rootEpicForServer = combineEpics(
  updateTitleEpic,
  updateDescriptionEpic
);
