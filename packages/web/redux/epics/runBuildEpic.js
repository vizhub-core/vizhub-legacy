import { mapTo, debounceTime } from 'rxjs/operators';
import { uiRedux } from 'vizhub-ui';

const {
  actionTypes: {
    BUILD_FINISHED
  },
  actionCreators: {
    runFiles
  }
} = uiRedux;

export const runBuildEpic = action$ =>
  action$.ofType(BUILD_FINISHED).pipe(
    mapTo(runFiles())
  );
