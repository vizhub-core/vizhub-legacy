import React, { createContext, useReducer, useEffect } from 'react';

export const SplitPaneResizeContext = createContext();

const initialWidth =
  +localStorage.getItem('codeEditorWidth') || (window.innerWidth * 1) / 3;

const reducer = (codeEditorWidth, movementClientX) =>
  codeEditorWidth + movementClientX;

export const SplitPaneResizeProvider = ({ children }) => {
  const [codeEditorWidth, moveSplitPane] = useReducer(reducer, initialWidth);

  useEffect(() => {
    if (codeEditorWidth !== initialWidth) {
      const timeout = setTimeout(() => {
        console.log('writing ' + codeEditorWidth);
        localStorage.setItem('codeEditorWidth', codeEditorWidth);
      }, 800);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [codeEditorWidth]);

  return (
    <SplitPaneResizeContext.Provider value={{ codeEditorWidth, moveSplitPane }}>
      {children}
    </SplitPaneResizeContext.Provider>
  );
};
