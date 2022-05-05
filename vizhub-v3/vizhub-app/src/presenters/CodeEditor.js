import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Spinner } from '../ui';
import { useEditorModules } from './useEditorModules';

// Feature flag to enable verbose OT related logging.
const debug = true;

// Keys are file ids
// Values are CodeMirror instances
const editorCache = new Map();

// Gets or creates a CodeMirror editor for the given file id.
const getOrCreateEditor = (fileId, shareDBDoc) => {
  let editor = editorCache.get(fileId);
  if (!editor) {
    // Cache miss --> mint a new editor.
    editor = VizHubCodeMirror.createEditor({
      shareDBDoc,
      path: ['files', fileId, 'text'],
      debug,
    });

    // Populate the cache.
    editorCache.set(fileId, editor);

    if (debug) {
      console.log('Cache miss, minted new editor for fileId ' + fileId + '.');
    }
  }
  return editor;
};

const CodeEditorBody = ({
  editorModules: { VizHubCodemirror },
  vizContentDoc,
  activeFileId,
}) => {
  const ref = useRef();

  // useEffect was buggy in that sometimes ref.current was undefined.
  // useLayoutEffect seems to solve that issue.
  useLayoutEffect(() => {
    console.log('activeFileId = ' + activeFileId);

    const editor = getOrCreateEditor(activeFileId, vizContentDoc);
    ref.current.appendChild(editor.dom);

    return () => {
      if (debug) {
        console.log('Switching to file ' + activeFileId);
      }
      ref.current.removeChild(editor.dom);
    };
  }, [vizContentDoc, activeFileId]);

  return <div className="editor-content-code-editor" ref={ref} />;
};

export const CodeEditor = ({ vizContentDoc, activeFileId }) => {
  const editorModules = useEditorModules();

  useEffect(
    () => () => {
      if (debug) {
        console.log('Tearing down CodeEditor instance.');
      }
      // TODO unsubscribe from ShareDB updates.
      //for (const editor of editorCache.values()) {
      //  editor.destroy();
      //}
      //editorCache.clear();
    },
    []
  );

  return editorModules ? (
    <CodeEditorBody
      vizContentDoc={vizContentDoc}
      activeFileId={activeFileId}
      editorModules={editorModules}
    />
  ) : (
    <Spinner />
  );
};
