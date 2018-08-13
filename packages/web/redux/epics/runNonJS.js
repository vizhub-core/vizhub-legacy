import { mapTo, filter, debounceTime } from 'rxjs/operators';
import { uiRedux, runDebounceTime } from 'vizhub-ui';

const {
  actionTypes: {
    CHANGE_FILE_TEXT
  },
  actionCreators: {
    runFiles
  }
} = uiRedux;

export const runNonJSEpic = action$ =>
  action$.ofType(CHANGE_FILE_TEXT).pipe(
    filter(action => !action.fileName.endsWith('.js')),
    filter(action => action.fileName !== 'README.md'),
    debounceTime(runDebounceTime),
    mapTo(runFiles())
  );
