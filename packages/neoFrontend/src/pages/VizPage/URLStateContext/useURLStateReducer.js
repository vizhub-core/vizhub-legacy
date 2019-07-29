import { useMemo, useCallback } from 'react';
import queryString from 'query-string';

// State that's related to the URL,
// but is not stored inside of it.
// For example, remembering which editor section was open.
// Expose to Puppeteer tests via global.
window.clearHiddenURLState = () => {
  window.hiddenURLState = {
    edit: null
  };
};

window.clearHiddenURLState();

export const useURLStateReducer = (reducer, { history, match, location }) => {
  const state = useMemo(() => queryString.parse(location.search), [
    location.search
  ]);

  state.hidden = window.hiddenURLState;

  const dispatch = useCallback(
    action => {
      const nextState = reducer(state, action);
      window.hiddenURLState = nextState.hidden;

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
