import React, { useRef, useEffect, useContext, useState, useMemo } from 'react';
import { VizContext } from '../../contexts';
import { useCodeMirror } from './useCodeMirror';
import { useMode } from './useMode';
import { useEditorView } from './useEditorView';
import { Wrapper, CodeMirrorGlobalStyle } from './styles';
import { PresenceDisplay } from './PresenceDisplay';

// TODO move this to a central home for accessors (core?).
const getWorkingFile = (vizData, fileId) => vizData.working.files[fileId];

export const Editor = ({ activeFileId }) => {
  const {
    vizData,
    submitVizOp,
    subscribeToVizOps,
    submitVizPresence,
    subscribeToVizPresence
  } = useContext(VizContext);

  const [presenceDisplayData, setPresenceDisplayData] = useState();

  const file = getWorkingFile(vizData, activeFileId);

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
  const mode = useMode(CodeMirror, file.path);
  const userId = useMemo(() => Math.random(), []);

  const editorView = useEditorView({
    CodeMirror,
    fileId: activeFileId,
    text: file.text,
    mode,
    // TODO rename to emitOp upstream
    emitOps: submitVizOp,
    subscribeToOps: subscribeToVizOps,
    submitPresence: submitVizPresence,
    subscribeToPresence: subscribeToVizPresence,
    displayPresence: setPresenceDisplayData,
    userId
  });

  const ref = useRef();

  // Keep the DOM nodes around for each CodeMirror instance.
  // Swap them out as the active file changes.
  // This is more performant than re-initializeing CodeMirror
  // each time the user changes the active file.
  useEffect(() => {
    if (editorView) {
      const current = ref.current;
      current.appendChild(editorView.dom);
      return () => {
        current.removeChild(editorView.dom);
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
      <PresenceDisplay
        data={presenceDisplayData}
        userId={userId}
        activeFileId={activeFileId}
      />
    </>
  );
};
