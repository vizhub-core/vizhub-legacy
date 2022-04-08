import { useState, useEffect } from 'react';
import { jsDelivrCombine } from '../jsDelivrCombine';

// Loads JavaScript dynamically.
const loadScript = (url) =>
  new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => {
      resolve();
    };
    document.head.appendChild(script);
  });

// Global singleton of cached modules,
// because we don't want to append the same <script> tag twice.
let cachedEditorModules = null;
export const useEditorModules = () => {
  const [editorModules, setEditorModules] = useState(cachedEditorModules);

  const libraries = jsDelivrCombine([
    `vizhub-codemirror@1.0.0/dist/vizhubCodemirror.min.js`,
  ]);

  useEffect(async () => {
    await loadScript(libraries);
    setEditorModules({ VizHubCodemirror: window.VizHubCodemirror });
  }, []);
  return editorModules;
};
