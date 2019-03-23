import { useEffect, useState } from 'react';

export const useCodeMirrorDynamicImport = initialDoc => {
  const [CodeMirror, setCodeMirror] = useState();
  useEffect(() => {
    import('./CodeMirror').then(setCodeMirror);
  });
  return CodeMirror;
};
