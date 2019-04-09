import React, { useRef, useEffect, useContext } from 'react';
import { VizContext } from '../../contexts';
import { useEditorView } from './useEditorView';
import { useCodeMirror } from './useCodeMirror';
import { Wrapper, CodeMirrorGlobalStyle } from './styles';

const extension = path => path.substr(path.lastIndexOf('.') + 1);

// TODO move this to a central home for accessors (core?).
const getWorkingFile = (vizData, fileId) => vizData.working.files[fileId];

export const Editor = ({ activeFileId }) => {
  const { vizData, submitVizOp, subscribeToVizOps } = useContext(VizContext);

  const { text, path } = getWorkingFile(vizData, activeFileId);

  // TODO clear out the cache of CodeMirror instances
  // (and unsubscribe their ops streams)
  // whenever the vizId changes.
  // useEffect(() => {
  //   Object.values(codeMirrorViewCache).forEach(view => {
  //     view.destroy();
  //     view.unsubscribeFromVizOps();
  //   });
  // }, [vizId]);
  const CodeMirror = useCodeMirror();

  console.log(subscribeToVizOps);

  const editorView = useEditorView(CodeMirror, activeFileId, {
    text,
    extension: extension(path),
    // TODO rename to emitOp upstream
    emitOps: submitVizOp,
    subscribeToOps: subscribeToVizOps
  });
  const ref = useRef();

  // Keep the DOM nodes around for each CodeMirror instance.
  // Swap them out as the active file changes.
  // This is more performant than re-initializeing CodeMirror
  // each time the user changes the active file.
  useEffect(() => {
    if (editorView) {
      ref.current.appendChild(editorView.dom);
      return () => {
        ref.current.removeChild(editorView.dom);
      };
    }
  }, [editorView]);

  const focusEditorView = () => {
    editorView.focus();
  };

  return (
    <>
      <CodeMirrorGlobalStyle />
      <Wrapper onClick={focusEditorView} ref={ref} />
    </>
  );
};
