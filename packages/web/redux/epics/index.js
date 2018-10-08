import { uiRedux } from 'vizhub-ui';
import { combineEpics } from 'redux-observable';
import { saveEpic } from './saveEpic';
import { startBuildEpic } from './startBuildEpic';
import { buildEpic } from './buildEpic';
import { runBuildEpic } from './runBuildEpic';
import { runNonJSEpic } from './runNonJS';
import { forkEpic } from './forkEpic';
import { forkSuccessEpic } from './forkSuccessEpic';
import { deleteVisualizationEpic } from './deleteVisualizationEpic';
import { deleteVisualizationSuccessEpic } from './deleteVisualizationSuccessEpic';

const {
  epics: {
    autoSaveEpic,
    promptForNewFileNameEpic,
    promptForNewHeightEpic,
    promptForRenameEpic,
    confirmFileDeleteEpic,
    confirmVisualizationDeleteEpic,
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
  confirmFileDeleteEpic,
  confirmVisualizationDeleteEpic,
  forkEpic,
  forkSuccessEpic,
  updateTitleEpic,
  updateDescriptionEpic,
  deleteVisualizationEpic,
  deleteVisualizationSuccessEpic
);

export const rootEpicForServer = combineEpics(
  updateTitleEpic,
  updateDescriptionEpic
);
