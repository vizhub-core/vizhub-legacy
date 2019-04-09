import { useEffect, useState } from 'react';

export const useCodeMirror = () => {
  const [CodeMirror, setCodeMirror] = useState();
  useEffect(() => {
    import('./CodeMirror').then(setCodeMirror);
  }, []);
  return CodeMirror;
};
