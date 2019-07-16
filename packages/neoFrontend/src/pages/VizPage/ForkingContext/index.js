import React, { createContext } from 'react';
import { useForking } from './useForking';

export const ForkingContext = createContext();

export const ForkingProvider = ({ fallback, children }) => {
  const { onFork, isForking } = useForking();

  return !isForking ? (
    <ForkingContext.Provider value={onFork}>{children}</ForkingContext.Provider>
  ) : (
    fallback
  );
};
