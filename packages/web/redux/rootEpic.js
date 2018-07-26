import { actionTypes } from 'vizhub-ui';
import { START_BUILD, BUILD_FINISHED } from './actionTypes';
import { combineEpics } from 'redux-observable';
import { debounceTime, delay, mapTo } from 'rxjs/operators';

const { CHANGE_FILE_TEXT, RUN_FILES } = actionTypes;

const startBuildEpic = action$ =>
  action$.ofType(CHANGE_FILE_TEXT).pipe(
    debounceTime(500),
    mapTo({ type: START_BUILD })
  );

const buildEpic = action$ =>
  action$.ofType(START_BUILD).pipe(
    delay(500), // TODO invoke rollup here
    mapTo({ type: BUILD_FINISHED })
  );

const runBuildEpic = action$ =>
  action$.ofType(BUILD_FINISHED).pipe(
    mapTo({ type: RUN_FILES })
  );

export const rootEpic = combineEpics(
  startBuildEpic,
  buildEpic,
  runBuildEpic
);
