import {
  actionTypes as uiActionTypes,
  actionCreators as uiActionCreators
} from 'vizhub-ui';

import { START_BUILD, BUILD_FINISHED } from './actionTypes';
import { startBuild, buildFinished } from './actionCreators';
import { combineEpics } from 'redux-observable';
import { debounceTime, delay, mapTo, map } from 'rxjs/operators';

const { CHANGE_FILE_TEXT } = uiActionTypes;
const { runFiles } = uiActionCreators;

const startBuildEpic = action$ =>
  action$.ofType(CHANGE_FILE_TEXT).pipe(
    debounceTime(500),
    mapTo(startBuild())
  );

const bundler = Bundler();
const buildEpic = action$ =>
  action$.ofType(START_BUILD).pipe(
    // TODO invoke rollup here
    //map(bundler.bundle)
    map(() => [{ name: 'bundle.js', text: 'foo' + Math.random() }]),
    map(files => {
      //console.log(files);
      return buildFinished(files);
    })
  );

const runBuildEpic = action$ =>
  action$.ofType(BUILD_FINISHED).pipe(
    mapTo(runFiles())
  );

export const rootEpic = combineEpics(
  startBuildEpic,
  buildEpic,
  runBuildEpic
);
