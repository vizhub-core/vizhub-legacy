import React, { createContext } from 'react';
import { useForking } from './useForking';
import { withRouter } from 'react-router';

export const ForkingContext = createContext();

export const ForkingProvider = withRouter(({ fallback, children, history }) => {
  const { onFork, isForking } = useForking(history);

  return !isForking ? (
    <ForkingContext.Provider value={onFork}>{children}</ForkingContext.Provider>
  ) : (
    fallback
  );
});
