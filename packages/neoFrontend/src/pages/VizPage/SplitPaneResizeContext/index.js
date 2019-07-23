import React, { createContext, useReducer } from 'react';

export const SplitPaneResizeContext = createContext();

// TODO local storage or fallback to percentage of display
const initialWidth = 500;

const reducer = (codeEditorWidth, movementClientX) =>
  codeEditorWidth + movementClientX;

export const SplitPaneResizeProvider = ({ children }) => {
  const [codeEditorWidth, dispatch] = useReducer(reducer, initialWidth);

  const contextValue = {
    codeEditorWidth,
    moveSplitPane: dispatch
  };

  return (
    <SplitPaneResizeContext.Provider value={contextValue}>
      {children}
    </SplitPaneResizeContext.Provider>
  );
};
