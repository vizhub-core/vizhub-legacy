import React, { createContext } from 'react';
import { useVimMode } from './useVimMode';

export const VimModeContext = createContext();

export const VimModeProvider = ({ children }) => (
  <VimModeContext.Provider value={useVimMode()}>
    {children}
  </VimModeContext.Provider>
);
