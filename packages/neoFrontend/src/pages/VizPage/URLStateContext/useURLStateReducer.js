import { useMemo, useCallback } from 'react';
import queryString from 'query-string';

// State that's related to the URL,
// but is not stored inside of it.
// For example, remembering which editor section was open
// after the editor is closed, so that it can be restored.
let hiddenURLState = { edit: null };

export const useURLStateReducer = (reducer, { history, match, location }) => {
  // TODO refactor state to {url, hidden}.
  const state = useMemo(() => queryString.parse(location.search), [
    location.search
  ]);

  state.hidden = hiddenURLState;

  const dispatch = useCallback(
    action => {
      const nextState = reducer(state, action);
      hiddenURLState = nextState.hidden;

      // Expose to Puppeteer tests via global.
      window.testVizHubHiddenURLState = hiddenURLState;

      delete nextState.hidden;
      history.push({
        pathname: match.url,
        search: queryString.stringify(nextState)
      });
    },
    [reducer, state, history, match.url]
  );

  return [state, dispatch];
};
