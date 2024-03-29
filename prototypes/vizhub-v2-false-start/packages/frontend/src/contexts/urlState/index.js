import React from 'react';
import { createContext } from 'react';
import { withURLState } from './withURLState';

export const URLStateContext = createContext();

export const URLStateProvider = withURLState(({ children, urlState }) => (
  <URLStateContext.Provider value={urlState}>
    {children}
  </URLStateContext.Provider>
));
