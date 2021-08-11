import React, { createContext } from 'react';

export const URLStateContext = createContext();

const urlStateConfig = {
  edit: {
    defaultValue: false,
    parse: (d) => d,
    stringify: (d) => d,
  },
};

// TODO move this state into the URL.
// https://github.com/stamen/pleth/blob/master/packages/examples/src/pleth/useURLState.js
// https://developer.mozilla.org/en-US/docs/Web/API/History/pushState

const urlStateReducer = (state, action) => {
  switch (action.type) {
    case 'setEdit':
      return { ...state, edit: action.edit };
    default:
      throw new Error();
  }
};

const useURLState = (urlStateConfig, urlStateReducer, query) => {
  const searchParams = query
    ? // Handle server side rendering.
      new Map(Object.entries(query))
    : // Handle client side rendering.
      new URL(window.location).searchParams;

  const urlState = {};
  for (const [key, config] of Object.entries(urlStateConfig)) {
    const { defaultValue, parse } = config;
    const value = searchParams.get(key);
    console.log('key');
    console.log(key);
    console.log('value');
    console.log(value);
    urlState[key] = value === undefined ? defaultValue : parse(value);
  }
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
