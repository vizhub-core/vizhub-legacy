import { useMemo, useCallback } from 'react';
import queryString from 'query-string';

// State that's related to the URL,
// but is not stored inside of it.
// For example, remembering which editor section was open
// after the editor is closed, so that it can be restored.
let hiddenURLState = {
  // Until the visual editor is ready,
  // open it to the files section automatically.
  edit: 'files',
};

const parseLine = (hash) => {
  const found = hash.match(/\d+/g);
  return found ? found[0] : found;
};

export const useURLStateReducer = (reducer, { history, match, location }) => {
  const state = useMemo(() => ({
    ...queryString.parse(location.search),
    line: parseLine(location.hash),
    hidden: hiddenURLState
  }) , [location.search, location.hash]);

  const dispatch = useCallback(
    (action) => {
      const nextState = reducer(state, action);
      hiddenURLState = nextState.hidden;

      // Expose to Puppeteer tests via global.
      window.testVizHubHiddenURLState = hiddenURLState;

      delete nextState.hidden;

      const { line, ...searchParams} = nextState;

      history.push({
        pathname: match.url,
        search: queryString.stringify(searchParams),
        hash: line ? `#L${line}` : ''
      });
    },
    [reducer, state, history, match.url]
  );

  return [state, dispatch];
};
