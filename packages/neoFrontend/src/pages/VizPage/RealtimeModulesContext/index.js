import React, { createContext } from 'react';
import { useRealtimeModules } from './useRealtimeModules';

export const RealtimeModulesContext = createContext();

// Lazy load realtime-related modules.
export const RealtimeModulesProvider = ({ fallback, children }) => (
  <RealtimeModulesContext.Provider value={useRealtimeModules()}>
    {children}
  </RealtimeModulesContext.Provider>
);
