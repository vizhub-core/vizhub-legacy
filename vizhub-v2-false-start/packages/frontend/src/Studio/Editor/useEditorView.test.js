import React from 'react';
import ReactDOM from 'react-dom';
import { useEditorView } from './useEditorView';
import '../../testUtils/codemirrorGlobalShim';
import * as CodeMirror from './CodeMirror';
import { EditorViewPool } from './EditorViewPool';

describe('useEditorView', () => {
  it('does not create a CodeMirror view if CodeMirror is not provided', () => {
    const view = useEditorView({});
    expect(view).toBeFalsy();
  });

  it('does not create a CodeMirror view if fileId is not provided', () => {
    const view = useEditorView({ CodeMirror });
    expect(view).toBeFalsy();
  });

  it('creates a view and subscribes to ops and presence', () => {
    const subscribeToOps = jest.fn();
    const subscribeToPresence = jest.fn();
    const editorViewPool = new EditorViewPool('foo');
    const fileId = 'foo';
    const view = useEditorView({
      CodeMirror,
      fileId,
      subscribeToOps,
      subscribeToPresence,
      editorViewPool
    });
    expect(view).toBeTruthy();
    expect(subscribeToOps).toHaveBeenCalled();
    expect(subscribeToPresence).toHaveBeenCalled();
  });
});
