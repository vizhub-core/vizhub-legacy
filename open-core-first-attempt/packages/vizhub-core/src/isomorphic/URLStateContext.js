import React, { createContext, useState, useMemo, useCallback } from 'react';
import { isClient } from './isClient';

// Inspired by:
// https://github.com/stamen/pleth/blob/master/packages/examples/src/pleth/useURLState.js
// https://developer.mozilla.org/en-US/docs/Web/API/History/pushState

export const URLStateContext = createContext();

const urlStateConfig = {
  edit: {
    defaultValue: false,
    parse: (d) => true,
    stringify: (d) => (d ? '' : undefined),
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

// Removes unnecessary equals symbols from stringified query.
// From https://stackoverflow.com/questions/64316665/is-there-any-way-to-remove-equal-sign-at-the-only-key-parameter-on-the-query-str
const removeEmptyEquals = (str) => str.replace(/=$|=(?=&)/g, '');

const useURLState = (config, reducer, ssrQuery) => {
  const [query, setQuery] = useState(isClient ? initialQuery : ssrQuery);

  const urlState = useMemo(() => {
    const state = {};
    for (const [key, keyConfig] of Object.entries(config)) {
      const { defaultValue, parse } = keyConfig;
      const value = query[key];
      state[key] = value === undefined ? defaultValue : parse(value);
    }
    return state;
  }, [config, query]);

  console.log(urlState);

  const urlDispatch = useCallback(
    (action) => {
      const newURLState = reducer(urlState, action);
      const urlSearchParams = new URLSearchParams();
      for (const [key, keyConfig] of Object.entries(config)) {
        const { defaultValue, stringify } = keyConfig;
        urlSearchParams.set(key, stringify(newURLState[key]));
      }
      history.pushState(
        null,
        null,
        '?' + removeEmptyEquals(urlSearchParams.toString())
      );
      // TODO setQuery
    },
    [urlState, reducer]
  );

  return [urlState, urlDispatch];
};

export const URLStateContextProvider = ({ children, query }) => {
  const [urlState, urlDispatch] = useURLState(
    urlStateConfig,
    urlStateReducer,
    query
  );

  const isEditorOpen = urlState.edit;
  const setIsEditorOpen = useCallback(
    (isEditorOpen) => {
      urlDispatch({ type: 'setEdit', edit: isEditorOpen });
    },
    [urlDispatch]
  );

  const value = { isEditorOpen, setIsEditorOpen };

  return (
    <URLStateContext.Provider value={value}>
      {children}
    </URLStateContext.Provider>
  );
};
