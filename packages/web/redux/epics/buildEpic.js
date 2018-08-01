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

export const buildEpic = (action$, state$) =>
  action$.ofType(START_BUILD).pipe(
    switchMap(() => from(bundle(getFiles(state$.value))).pipe(
      map(buildFinished),
      catchError(error => {
        if (process.browser) {
          console.error(error);
        }
        return of(buildError(error));
      })
    ))
  );
