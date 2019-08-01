import React, { useContext } from 'react';
import { modShowViewer } from '../../../../../mobileMods';
import { getText } from '../../../../../accessors';
import { URLStateContext } from '../../../URLStateContext';
import { SplitPaneResizeContext } from '../../../SplitPaneResizeContext';
import { VizContext } from '../../../VizContext';
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
  const { viz, onFileChange, allowEditing } = useContext(VizContext);
  const { files } = viz.content;

  const text = getText(files, activeFile);

  const { codeEditorWidth } = useContext(SplitPaneResizeContext);

  const viewer = modShowViewer(showViewer, showEditor, activeFile);

  return activeFile ? (
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
      <CodeArea
        text={text}
        onTextChange={onFileChange(activeFile)}
        allowEditing={allowEditing}
      />
    </Wrapper>
  ) : null;
};
