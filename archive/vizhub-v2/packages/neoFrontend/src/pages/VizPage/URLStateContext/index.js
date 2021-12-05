import React, { createContext } from 'react';
import { withRouter } from 'react-router';
import { useURLState } from './useURLState';

export const URLStateContext = createContext();

export const URLStateProvider = withRouter(
  ({ history, match, location, children }) => {
    const urlState = useURLState({ history, match, location });
    return (
      <URLStateContext.Provider value={urlState}>
        {children}
      </URLStateContext.Provider>
    );
  }
);
