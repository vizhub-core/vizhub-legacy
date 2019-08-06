import React, { useContext } from 'react';
import { modShowViewer } from '../../../../../mobileMods';
import { URLStateContext } from '../../../URLStateContext';
import { SplitPaneResizeContext } from '../../../SplitPaneResizeContext';
import { Wrapper } from './styles';
import { CodeArea } from './CodeArea';
import { CodeEditorHeader } from './CodeEditorHeader';

export const CodeEditor = () => {
  const {
    activeFile,
    showEditor,
    onHideViz,
    onShowViz,
    showViewer,
    closeActiveFile
  } = useContext(URLStateContext);

  const { codeEditorWidth } = useContext(SplitPaneResizeContext);

  const viewer = modShowViewer(showViewer, showEditor, activeFile);

  return (
    <Wrapper
      showLeftBorder={showEditor}
      style={viewer ? { width: codeEditorWidth + 'px' } : { flex: 1 }}
      className="test-code-editor"
    >
      <CodeEditorHeader
        activeFile={activeFile}
        viewer={viewer}
        onShowViz={onShowViz}
        onHideViz={onHideViz}
        closeActiveFile={closeActiveFile}
      />
      <CodeArea activeFile={activeFile} />
    </Wrapper>
  );
};
