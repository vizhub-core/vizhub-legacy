import { of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { bundle } from 'datavis-tech-presenters';
import { uiRedux } from 'vizhub-ui';
import { START_BUILD, BUILD_ERROR } from '../actionTypes';
import { buildFinished, buildError } from '../actionCreators';

const {
  selectors: {
    getFiles
  }
} = uiRedux;

const message = error => error.toString();
const isSyntaxError = error => error.code === 'PARSE_ERROR';
const loc = error => error.loc;
const file = error => loc(error).file;
const line = error => loc(error).line;
const frame = error => error.frame;

export const buildEpic = (action$, state$) =>
  action$.ofType(START_BUILD).pipe(
    switchMap(() => from(bundle(getFiles(state$.value))).pipe(
      map(buildFinished),
      catchError(error => {
        if (process.browser) {
          console.error([
            message(error),
            'in ' + file(error) + ' line ' + line(error),
            '\n' + frame(error),
            '(bundle.js not updated)'
          ].join('\n'));
        }
        return of(buildError(error));
      })
    ))
  );
