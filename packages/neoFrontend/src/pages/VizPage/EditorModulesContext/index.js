import React, { createContext } from 'react';
import { useEditorModules } from './useEditorModules';

export const EditorModulesContext = createContext();

// Lazy load editor-related modules.
// These include (in broad strokes)
//  - Codemirror stuff for syntax-highlighted code editing
//  - Stuff required for generating the JS bundle
export const EditorModulesProvider = ({ fallback, children }) => (
  <EditorModulesContext.Provider value={useEditorModules()}>
    {children}
  </EditorModulesContext.Provider>
);
