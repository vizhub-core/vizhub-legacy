import React, { createContext, useCallback, useReducer } from 'react';

export const SplitPaneResizeContext = createContext();

// TODO local storage or fallback to percentage of display
const initialWidth = 500;

const reducer = (state, action) => state + action.movementX;

export const SplitPaneResizeProvider = ({ children }) => {
  const [codeEditorWidth, dispatch] = useReducer(reducer, initialWidth);

  const moveSplitPane = useCallback(movementX => {
    dispatch({ movementX });
  }, []);

  const contextValue = { codeEditorWidth, moveSplitPane };

  return (
    <SplitPaneResizeContext.Provider value={contextValue}>
      {children}
    </SplitPaneResizeContext.Provider>
  );
};
