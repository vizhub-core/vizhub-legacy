import React, { useContext } from 'react';
import { modShowViewer } from '../../../../../mobileMods';
import { getFile } from '../../../../../accessors';
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
  const { viz, onFileChange, vizContentDoc } = useContext(VizContext);

  const allowEditing = vizContentDoc ? true : false;

  const { files } = viz.content;

  const file = getFile(files, activeFile);

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
        file={file}
        onTextChange={onFileChange(activeFile)}
        allowEditing={allowEditing}
      />
    </Wrapper>
  ) : null;
};
