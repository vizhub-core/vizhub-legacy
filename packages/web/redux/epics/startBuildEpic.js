import { startBuild } from '../actionCreators';
import { uiRedux, runDebounceTime } from 'vizhub-ui';
import { mapTo, debounceTime, filter } from 'rxjs/operators';

const {
  actionTypes: {
    CHANGE_FILE_TEXT
  }
} = uiRedux;

export const startBuildEpic = action$ =>
  action$.ofType(CHANGE_FILE_TEXT).pipe(
    filter(action => action.fileName.endsWith('.js')),
    debounceTime(runDebounceTime),
    mapTo(startBuild())
  );
