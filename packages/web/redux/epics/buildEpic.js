import { of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { bundle } from 'vizhub-presenters';
import { uiRedux } from 'vizhub-ui';
import { START_BUILD, BUILD_ERROR } from '../actionTypes';
import { buildFinished, buildError } from '../actionCreators';

const {
  selectors: {
    getFiles
  }
} = uiRedux;

const relativeId = id =>
  (typeof id === 'string' && id.length > 0 && id[0] === '/')
    ? id.substr(1)
    : id;

// Inspired by https://github.com/rollup/rollup/blob/master/bin/src/logging.ts
const logRollupError = error => {
  const lines = [];

  let message = error.message || error;
  if (error.name) {
    message = `${error.name}: ${message}`;
  }

  lines.push(`${message.toString()}`);

  if (error.url) {
    lines.push(error.url);
  }

  if (error.loc) {
    lines.push(`${error.loc.file || error.id} (line ${error.loc.line})`);
  } else if (error.id) {
    lines.push(error.id);
  }

  if (error.frame) {
    lines.push(error.frame);
  }

  // if (error.stack) {
  //   lines.push(error.stack);
  // }
            
  lines.push('(bundle.js not updated)');

  console.error(lines.join('\n'));
};

export const buildEpic = (action$, state$) =>
  action$.ofType(START_BUILD).pipe(
    switchMap(() => from(bundle(getFiles(state$.value))).pipe(
      map(buildFinished),
      catchError(error => {
        if (process.browser) {
          logRollupError(error);
        }
        return of(buildError(error));
      })
    ))
  );
