import React, { createContext } from 'react';
import { useConnection } from './useConnection';

export const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => (
  <ConnectionContext.Provider value={useConnection()}>
    {children}
  </ConnectionContext.Provider>
);
