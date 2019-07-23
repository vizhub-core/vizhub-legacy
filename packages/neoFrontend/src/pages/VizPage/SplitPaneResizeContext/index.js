import React, { createContext, useReducer, useEffect } from 'react';

export const SplitPaneResizeContext = createContext();

const localStorageWriteDebounceMS = 800;

const initialWidthLocalStorage = +localStorage.getItem('codeEditorWidth');
const initialWidthPercentage = window.innerWidth / 3;
const initialWidth = initialWidthLocalStorage || initialWidthPercentage;

const reducer = (codeEditorWidth, movementClientX) =>
  codeEditorWidth + movementClientX;

export const SplitPaneResizeProvider = ({ children }) => {
  const [codeEditorWidth, moveSplitPane] = useReducer(reducer, initialWidth);

  useEffect(() => {
    if (codeEditorWidth !== initialWidth) {
      const timeout = setTimeout(() => {
        localStorage.setItem('codeEditorWidth', codeEditorWidth);
      }, localStorageWriteDebounceMS);

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
