import { useCallback, useState } from 'react';

// Allow context comsumers to trigger loading of these modules.
// They are not needed only if viewing a viz,
// only of one opens the code editor are these required.
// They can be pre-loaded when the user opens the editor sidebar,
// so that they are "ready to go" when the code editor opens.
export const useEditorModules = () => {
  const [editorModules, setEditorModules] = useState();

  const loadEditorModules = useCallback(() => {
    if (!editorModules) {
      import('./editorModules').then(setEditorModules);
    }
  }, [editorModules, setEditorModules]);

  return {
    editorModules,
    loadEditorModules
  };
};
