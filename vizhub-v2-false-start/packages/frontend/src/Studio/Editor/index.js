import React, { useRef, useEffect, useContext, useState, useMemo } from 'react';
import { VizContext } from '../../contexts';
import { useCodeMirror } from './useCodeMirror';
import { useMode } from './useMode';
import { useEditorView } from './useEditorView';
import { useEditorViewPool } from './useEditorViewPool';
import { Wrapper, CodeMirrorGlobalStyle } from './styles';
import { PresenceDisplay } from './PresenceDisplay';
import { extension } from './extension';

// TODO move this to a central home for accessors (core?).
const getWorkingFile = (vizData, fileId) => vizData.working.files[fileId];

export const Editor = ({ activeFileId }) => {
  const {
    vizId,
    vizData,
    submitVizOp,
    subscribeToVizOps,
    submitVizPresence,
    subscribeToVizPresence
  } = useContext(VizContext);

  // TODO get this from the authentication context.
  const userId = useMemo(() => Math.random(), []);

  // TODO move this up the component tree, so that
  // presence display(s) can be implemented elsewhere (e.g. on files in the configurator).
  // Perhaps something like useContext(PresenceDisplayDataContext)
  const [presenceDisplayData, setPresenceDisplayData] = useState();

  const file = getWorkingFile(vizData, activeFileId);

  const CodeMirror = useCodeMirror();
  const mode = useMode(CodeMirror, extension(file.path));

  const editorViewPool = useEditorViewPool(vizId);

  // Sanity check - does this occur?
  if (editorViewPool && editorViewPool.vizId !== vizId) {
    console.log('editorViewPool.vizId !== vizId');
    console.log(editorViewPool.vizId, '!==', vizId);
  }

  const editorView = useEditorView({
    editorViewPool,
    CodeMirror,
    fileId: activeFileId,
    text: file.text,
    mode,
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
