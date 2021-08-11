import React, { createContext, useState } from 'react';
import { isClient } from './isClient';

// Inspired by:
// https://github.com/stamen/pleth/blob/master/packages/examples/src/pleth/useURLState.js
// https://developer.mozilla.org/en-US/docs/Web/API/History/pushState

export const URLStateContext = createContext();

const urlStateConfig = {
  edit: {
    defaultValue: false,
    parse: (d) => true,
    stringify: (d) => d,
  },
};

const urlStateReducer = (state, action) => {
  switch (action.type) {
    case 'setEdit':
      return { ...state, edit: action.edit };
    default:
      throw new Error();
  }
};

const getQuery = () => {
  const query = {};
  for (const [key, value] of new URL(window.location).searchParams) {
    query[key] = value;
  }
  return query;
};

const initialQuery = isClient ? getQuery() : null;

const useURLState = (urlStateConfig, urlStateReducer, ssrQuery) => {
  const [query, setQuery] = useState(isClient ? initialQuery : ssrQuery);

  const urlState = {};
  for (const [key, { defaultValue, parse }] of Object.entries(urlStateConfig)) {
    const value = query[key];
    urlState[key] = value === undefined ? defaultValue : parse(value);
  }
  console.log(urlState);

  //  const urlDispatch = useCallback(
  //    (action) => {
  //history.pushState(null, null, "?"+queryParams.toString());
  //..reducer(urlState, action)
  //},
  //    [urlState, reducer]
  //  );

  //  return [urlState, dispatch];
  return urlState;
};

export const URLStateContextProvider = ({ children, query }) => {
  const urlState = useURLState(urlStateConfig, urlStateReducer, query);

  return (
    <URLStateContext.Provider value={urlState}>
      {children}
    </URLStateContext.Provider>
  );
};
