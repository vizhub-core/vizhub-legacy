import { useEffect, useState } from 'react';

// A "pool" is a cache of view instances for the currently open visualization.
// When the user navigates between visualizations,
// all these views (and their corresponding subscriptions)
// should be cleaned up, making way for the views of the newly open visualization.
class Pool {
  constructor (vizId) {

    // - Keys are fileId values.
    // - Values are view instances created in useEditorView.
    this._views = {};

    this.vizId = vizId;
  }
  getView (fileId) {
    return this._views[fileId];
  }
  setView (fileId, view) {
    return this._views[fileId] = view;
  }
  destroy () {
    Object.values(this._views).forEach(view => {
      view.destroy();
    });
    this._views = {};
  }
}

const createPool = () => new Pool();

export const useEditorViewPool = vizId => {
  const [pool, setPool] = useState();
  useEffect(() => {
    const newPool = new Pool(vizId);
    setPool(newPool);
    return () => newPool.destroy()
  }, [vizId]);
  return pool;
};
