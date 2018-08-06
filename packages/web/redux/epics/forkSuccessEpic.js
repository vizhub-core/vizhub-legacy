import Router from 'next/router';
import { map, filter } from 'rxjs/operators';
import { uiRedux } from 'vizhub-ui';
import { visualizationRoute } from '../../routes/routeGenerators';

const {
  actionTypes: {
    FORK_SUCCESS
  }
} = uiRedux;

export const forkSuccessEpic = (action$, state$) =>
  action$.ofType(FORK_SUCCESS).pipe(
    map(action => Router.push(visualizationRoute(action))),
    filter(Boolean)
  );
