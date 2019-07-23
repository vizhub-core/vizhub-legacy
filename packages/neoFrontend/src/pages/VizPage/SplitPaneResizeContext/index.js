import React, { createContext, useReducer } from 'react';

export const SplitPaneResizeContext = createContext();

// TODO local storage
const initialWidth = window.innerWidth * 1 / 3;

const reducer = (codeEditorWidth, movementClientX) =>
  codeEditorWidth + movementClientX;

export const SplitPaneResizeProvider = ({ children }) => {
  const [codeEditorWidth, moveSplitPane] = useReducer(reducer, initialWidth);

  return (
    <SplitPaneResizeContext.Provider value={{ codeEditorWidth, moveSplitPane }}>
      {children}
    </SplitPaneResizeContext.Provider>
  );
};
