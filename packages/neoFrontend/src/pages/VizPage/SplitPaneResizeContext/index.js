import React, { createContext, useCallback } from 'react';

export const SplitPaneResizeContext = createContext();

// TODO local storage
//
export const SplitPaneResizeProvider = ({ children }) => {
  const moveSplitPane = useCallback(movementX => {
    console.log('move split pane by ' + movementX);
  }, []);

  const contextValue = { moveSplitPane };

  return (
    <SplitPaneResizeContext.Provider value={contextValue}>
      {children}
    </SplitPaneResizeContext.Provider>
  );
};
