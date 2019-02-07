import { map, filter } from 'rxjs/operators';
import { DELETE_FILE } from '../actionTypes';
import { fileDeleted } from '../actionCreators';

export const confirmFileDeleteEpic = action$ =>
  action$.ofType(DELETE_FILE).pipe(
    map(action => (
      window.confirm('Are you sure?')
        ? fileDeleted(action.fileName)
        : null
    )),
    filter(Boolean)
  );
