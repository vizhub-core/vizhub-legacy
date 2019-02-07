import { map, filter } from 'rxjs/operators';
import { DELETE_VISUALIZATION } from '../actionTypes';
import { visualizationDeleted } from '../actionCreators';

export const confirmVisualizationDeleteEpic = action$ =>
  action$.ofType(DELETE_VISUALIZATION).pipe(
    map(action => (
      window.confirm('Are you sure you want to delete this visualization?')
        ? visualizationDeleted()
        : null
    )),
    filter(Boolean)
  );
