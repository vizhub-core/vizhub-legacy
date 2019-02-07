import { debounceTime, mapTo } from 'rxjs/operators';
import { CHANGE_FILE_TEXT, SET_VISUALIZATION_HEIGHT } from '../actionTypes';
import { save } from '../actionCreators';
import { autoSaveDebounceTime } from '../../constants';

export const autoSaveEpic = action$ =>
  action$.ofType(CHANGE_FILE_TEXT, SET_VISUALIZATION_HEIGHT).pipe(
    debounceTime(autoSaveDebounceTime),
    mapTo(save())
  );
