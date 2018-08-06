import { defer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { uiRedux } from 'vizhub-ui';
import { getCsrfToken, getVisualization } from '../selectors';

const {
  actionTypes: {
    FORK_VISUALIZATION
  },
  actionCreators: {
    forkError,
    forkSuccess
  },
  selectors: {
    getFiles
  }
} = uiRedux;

export const forkEpic = (action$, state$) =>
  action$.ofType(FORK_VISUALIZATION).pipe(
    switchMap(action => defer(async () => {

      const state = state$.value;
      const csrfToken = getCsrfToken(state);

      const visualization = Object.assign(
        {},
        getVisualization(state),
        { files: getFiles(state) }
      );

      const url = `/api/visualization/fork`;
      const options = {
        credentials: 'include',
        method: 'POST',
        headers: {
          'x-csrf-token': csrfToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          visualization
        })
      };
      const response = await (await fetch(url, options)).json();

      return response.error
        ? forkError(response.error)
        : forkSuccess(response.id, response.userName);
    }))
  );
