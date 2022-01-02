// A "pool" is a cache of view instances for the currently open visualization.
// When the user navigates between visualizations,
// all these views (and their corresponding subscriptions)
// should be cleaned up, making way for the views of the newly open visualization.
export class EditorViewPool {
  constructor(vizId) {
    // - Keys are fileId values.
    // - Values are view instances created in useEditorView.
    this._views = {};

    this.vizId = vizId;
  }
  getView(fileId) {
    return this._views[fileId];
  }
  setView(fileId, view) {
    this._views[fileId] = view;
    return view;
  }

  // Cleans up all views in this pool.
  destroy() {
    Object.values(this._views).forEach(view => {
      // Each view is expected to implement a destroy() method.
      view.destroy();
    });
    this._views = {};
  }
}
