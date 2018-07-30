import { uiRedux } from 'vizhub-ui';
import { combineEpics } from 'redux-observable';
import { saveEpic } from './saveEpic';
import { startBuildEpic } from './startBuildEpic';
import { buildEpic } from './buildEpic';
import { runBuildEpic } from './runBuildEpic';
import { runNonJSEpic } from './runNonJS';

const {
  epics: {
    autoSaveEpic
  }
} = uiRedux;

export const rootEpic = combineEpics(
  startBuildEpic,
  buildEpic,
  runBuildEpic,
  runNonJSEpic,
  autoSaveEpic,
  saveEpic
);
