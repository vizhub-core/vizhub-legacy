import { mapTo, debounceTime } from 'rxjs/operators';
import { uiRedux } from 'vizhub-ui';

const {
  actionTypes: {
    BUILD_FINISHED,
    SET_VISUALIZATION_HEIGHT
  },
  actionCreators: {
    runFiles
  }
} = uiRedux;

export const runBuildEpic = action$ =>
  action$.ofType(BUILD_FINISHED, SET_VISUALIZATION_HEIGHT).pipe(
    mapTo(runFiles())
  );
