import React, { createContext } from 'react';
import { usePrettier } from './usePrettier';

export const PrettierContext = createContext();

// This context is responsible for loading and running Prettier
// to auto-format the active file from within the editor.
export const PrettierProvider = ({ fallback, children }) => (
  <PrettierContext.Provider value={usePrettier()}>
    {children}
  </PrettierContext.Provider>
);
