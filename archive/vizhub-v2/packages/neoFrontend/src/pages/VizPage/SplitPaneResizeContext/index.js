import React, { useState, createContext, useReducer, useEffect } from 'react';

export const SplitPaneResizeContext = createContext();

const localStorageWriteDebounceMS = 800;

const initialWidthLocalStorage = +localStorage.getItem('codeEditorWidth');
const initialWidthPercentage = window.innerWidth / 3;
const initialWidth = initialWidthLocalStorage || initialWidthPercentage;

const reducer = (codeEditorWidth, movementClientX) =>
  codeEditorWidth + movementClientX;

export const SplitPaneResizeProvider = ({ children }) => {
  const [codeEditorWidth, moveSplitPane] = useReducer(reducer, initialWidth);
  const [isDragging, setIsDragging] = useState(false);

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
    <SplitPaneResizeContext.Provider
      value={{ codeEditorWidth, moveSplitPane, isDragging, setIsDragging }}
    >
      {children}
    </SplitPaneResizeContext.Provider>
  );
};
