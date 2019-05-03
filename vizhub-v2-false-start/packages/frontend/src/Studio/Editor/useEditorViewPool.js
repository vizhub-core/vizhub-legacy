import { useEffect, useState } from 'react';

// A "pool" is a cache of view instances for the currently open visualization.
// When the user navigates between visualizations,
// all these views (and their corresponding subscriptions)
// should be cleaned up, making way for the views of the newly open visualization.

// Creates an editor view pool.
//  - Keys are fileId values.
//  - Values are view instances created in useEditorView.
const createPool = () => ({});

// Cleans up an editor view pool.
const cleanupPool = pool => {
  // TODO test
  Object.values(pool).forEach(view => {
    view.destroy();
  });
};

export const useEditorViewPool = vizId => {
  const [pool, setPool] = useState();
  useEffect(() => {
    const newPool = createPool();
    setPool(newPool);
    return cleanupPool(newPool);
  }, [vizId]);
  return pool;
};
