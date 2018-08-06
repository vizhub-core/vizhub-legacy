import Router from 'next/router';
import { map, filter } from 'rxjs/operators';
import { FORK_SUCCESS } from '../actionTypes';
import { visualizationRoute } from '../../routes/routeGenerators';

export const forkSuccessEpic = (action$, state$) =>
  action$.ofType(FORK_SUCCESS).pipe(
    map(action => Router.push(visualizationRoute(action))),
    filter(Boolean)
  );
