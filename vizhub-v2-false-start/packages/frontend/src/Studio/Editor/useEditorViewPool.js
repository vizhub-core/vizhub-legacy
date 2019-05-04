import { useEffect, useState } from 'react';
import { EditorViewPool } from './EditorViewPool';

export const useEditorViewPool = vizId => {
  const [editorViewPool, setEditorViewPool] = useState();
  useEffect(() => {
    const newEditorViewPool = new EditorViewPool(vizId);
    setEditorViewPool(newEditorViewPool);
    return () => newEditorViewPool.destroy();
  }, [vizId]);
  return editorViewPool;
};
