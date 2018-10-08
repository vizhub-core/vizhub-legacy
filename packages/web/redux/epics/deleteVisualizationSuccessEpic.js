import Router from 'next/router';
import { map, filter } from 'rxjs/operators';
import { visualizationRoute } from '../../routes/routeGenerators';
import { VISUALIZATION_DELETE_SUCCESS } from '../actionTypes';

export const deleteVisualizationSuccessEpic = (action$, state$) =>
  action$.ofType(VISUALIZATION_DELETE_SUCCESS).pipe(
    map(action => Router.push(profileRoute({
      userName: state$.value.user
    }))),
    filter(Boolean)
  );
