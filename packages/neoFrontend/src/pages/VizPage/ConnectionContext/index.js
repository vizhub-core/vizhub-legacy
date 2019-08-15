import React, { createContext } from 'react';
import { useConnection } from './useConnection';

export const ConnectionContext = createContext();

export const ConnectionProvider = ({ fallback, children }) => (
  <ConnectionContext.Provider value={useConnection()}>
    {children}
  </ConnectionContext.Provider>
);
