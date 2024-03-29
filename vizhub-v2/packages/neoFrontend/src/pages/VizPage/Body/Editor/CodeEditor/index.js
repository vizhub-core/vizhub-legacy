import React, { useContext, useEffect } from 'react';
import { modShowViewer } from '../../../../../mobileMods';
import { URLStateContext } from '../../../URLStateContext';
import { SplitPaneResizeContext } from '../../../SplitPaneResizeContext';
import { VizContext } from '../../../VizContext';
import { Wrapper } from './styles';
import { CodeArea } from './CodeArea';
import { CodeEditorHeader } from './CodeEditorHeader';
import { useUpdateURLOnRename } from './useUpdateURLOnRename';

export const CodeEditor = ({ showTop, toggleShowTop }) => {
  const {
    selectedLines,
    activeFile,
    showEditor,
    onHideViz,
    onShowViz,
    showViewer,
    closeActiveFile,
    toggleLine,
    openLink,
  } = useContext(URLStateContext);

  const { codeEditorWidth } = useContext(SplitPaneResizeContext);

  useUpdateURLOnRename();

  const viewer = modShowViewer(showViewer, showEditor, activeFile);

  // Easter egg.
  // Manual test for cursor transform.
  const { submitVizContentOp } = useContext(VizContext);

  useEffect(() => {
    if (!submitVizContentOp) {
      return;
    }
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.code === 'KeyD') {
        console.log(
          "You've triggered the manual test for cursor transforms with ALT+D!"
        );
        setInterval(() => {
          submitVizContentOp({ si: 'e', p: ['files', 0, 'text', 5] });
        }, 1000);
      }
    });
  }, [submitVizContentOp]);

  return (
    <Wrapper
      showLeftBorder={showEditor}
      style={viewer ? { width: codeEditorWidth + 'px' } : { flex: '1' }}
      className="test-code-editor"
    >
      <CodeEditorHeader
        showTop={showTop}
        toggleShowTop={toggleShowTop}
        showEditor={showEditor}
        activeFile={activeFile}
        viewer={viewer}
        onShowViz={onShowViz}
        onHideViz={onHideViz}
        closeActiveFile={closeActiveFile}
      />
      <CodeArea
        key={activeFile}
        activeFile={activeFile}
        closeActiveFile={closeActiveFile}
        selectedLines={selectedLines}
        onGutterClick={toggleLine}
        onLinkClick={openLink}
      />
    </Wrapper>
  );
};
