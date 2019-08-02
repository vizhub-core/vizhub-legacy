import React, { createContext } from 'react';
import { useRealtimeModules } from './useRealtimeModules';

export const RealtimeModulesContext = createContext();

export const RealtimeModulesProvider = ({ fallback, children }) => {
  // Lazy load realtime-related modules.
  const realtimeModules = useRealtimeModules();

  return (
    <RealtimeModulesContext.Provider value={realtimeModules}>
      {children}
    </RealtimeModulesContext.Provider>
  );
};
