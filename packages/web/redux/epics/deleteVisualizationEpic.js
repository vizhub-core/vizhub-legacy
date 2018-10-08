import { defer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { uiRedux } from 'vizhub-ui';
import { getVisualization } from '../selectors';
import {
  visualizationDeleteSuccess,
  visualizationDeleteError
} from '../actionCreators';

const {
  actionTypes: {
    VISUALIZATION_DELETED
  }
} = uiRedux;

export const deleteVisualizationEpic = (action$, state$) =>
  action$.ofType(VISUALIZATION_DELETED).pipe(
    switchMap(action => defer(async () => {

      const state = state$.value;
      const visualization = getVisualization(state);
      const id = visualization.id;

      const url = `/api/visualization/delete`;
      const options = {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      };
      const response = await (await fetch(url, options)).json();

      return response.error
        ? visualizationDeleteError(response.error)
        : visualizationDeleteSuccess();
    }))
  );
