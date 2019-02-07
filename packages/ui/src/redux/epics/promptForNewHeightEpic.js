import { map } from 'rxjs/operators';
import { SET_HEIGHT_PROMPT } from '../actionTypes';
import { setVisualizationHeight } from '../actionCreators';
import { getVisualizationHeight } from '../selectors';

export const promptForNewHeightEpic = (action$, state$) =>
  action$.ofType(SET_HEIGHT_PROMPT).pipe(
    map(() => {
      const oldHeight = getVisualizationHeight(state$.value);
      const newHeight = window.prompt('Please enter a new height', oldHeight);
      return setVisualizationHeight(+newHeight);
    })
  );
