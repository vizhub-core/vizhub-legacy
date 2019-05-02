import React from 'react';
import ReactDOM from 'react-dom';
import { useEditorView } from './useEditorView';
import '../../testUtils/codemirrorGlobalShim';
import * as CodeMirror from './CodeMirror';

describe('useEditorView', () => {
  it('does not create a CodeMirror view if CodeMirror is not provided', () => {
    const view = useEditorView({});
    expect(view).toBeFalsy();
  });

  it('does not create a CodeMirror view if fileId is not provided', () => {
    const view = useEditorView({CodeMirror});
    expect(view).toBeFalsy();
  });

  it('does create a CodeMirror view if CodeMirror and fileId are provided', () => {
    const view = useEditorView({CodeMirror, fileId: 'foo'});
    expect(view).toBeTruthy();
  });
});
