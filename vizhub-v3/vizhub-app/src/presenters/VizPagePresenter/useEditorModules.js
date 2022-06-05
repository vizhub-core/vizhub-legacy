import { useState, useEffect } from 'react';
import { jsDelivrCombine } from '../../jsDelivrCombine';

//import { dependencies } from '../../package.json';
//console.log(dependencies['vizhub-codemirror']);

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
    `vizhub-codemirror@1.2.2/dist/vizhubCodemirror.min.js`,
  ]);

  useEffect(() => {
    const getEditorModules = async () => {
      await loadScript(libraries);
      setEditorModules({ VizHubCodemirror: window.VizHubCodemirror });
    };
    getEditorModules();
  }, []);
  return editorModules;
};
