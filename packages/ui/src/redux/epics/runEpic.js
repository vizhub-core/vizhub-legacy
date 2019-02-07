import { debounceTime, mapTo } from 'rxjs/operators';
import { CHANGE_FILE_TEXT, SET_VISUALIZATION_HEIGHT } from '../actionTypes';
import { runFiles } from '../actionCreators';
import { runDebounceTime } from '../../constants';

export const runEpic = action$ =>
  action$.ofType(CHANGE_FILE_TEXT, SET_VISUALIZATION_HEIGHT).pipe(
    debounceTime(runDebounceTime),
    mapTo(runFiles())
  );
