import { useMemo, useCallback } from 'react';
import queryString from 'query-string';

export const useURLStateReducer = (reducer, { history, match, location }) => {
  const state = useMemo(() => queryString.parse(location.search), [
    location.search
  ]);

  const dispatch = useCallback(
    action => {
      const nextState = reducer(state, action);
      history.push({
        pathname: match.url,
        search: queryString.stringify(nextState)
      });
    },
    [reducer, state, history, match.url]
  );

  return [state, dispatch];
};
