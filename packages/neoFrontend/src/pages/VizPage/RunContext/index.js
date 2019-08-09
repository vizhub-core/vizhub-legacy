import React, { createContext } from 'react';
import { useRun } from './useRun';

export const RunContext = createContext();

// This context is responsible for figuring out when to re-run the code,
// and when to recompute and store bundle.js.
export const RunProvider = ({ fallback, children }) => (
  <RunContext.Provider value={useRun()}>{children}</RunContext.Provider>
);
