import Router from 'next/router';
import { map, filter } from 'rxjs/operators';
import { profileRoute } from '../../routes/routeGenerators';
import { getUserName } from '../selectors';
import { VISUALIZATION_DELETE_SUCCESS } from '../actionTypes';

export const deleteVisualizationSuccessEpic = (action$, state$) =>
  action$.ofType(VISUALIZATION_DELETE_SUCCESS).pipe(
    map(action => Router.push(profileRoute({
      userName: getUserName(state$.value)
    }))),
    filter(Boolean)
  );
