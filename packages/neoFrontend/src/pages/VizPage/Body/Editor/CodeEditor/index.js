import React, { useContext } from 'react';
import { isMobile, modShowViewer } from '../../../../../mobileMods';
import { FullSVG, CloseSVG } from '../../../../../svg';
import { getText } from '../../../../../accessors';
import { URLStateContext } from '../../../URLStateContext';
import { SplitPaneResizeContext } from '../../../SplitPaneResizeContext';
import { VizContext } from '../../../VizContext';
import { Wrapper, Header, Icons, CodeEditorIcon } from './styles';
import { CodeArea } from './CodeArea';

const svgHeight = 15;

export const CodeEditor = () => {
  const {
    activeFile,
    showEditor,
    onHideViz,
    onShowViz,
    showViewer,
    closeActiveFile
  } = useContext(URLStateContext);
  const { viz, onFileChange } = useContext(VizContext);
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
      <Header>
        <div className="test-code-editor-file-name">{activeFile}</div>
        <Icons>
          {viewer ? (
            <>
              <CodeEditorIcon
                onClick={onHideViz}
                leftmost={true}
                className="test-enter-full-editor"
              >
                <FullSVG height={svgHeight} />
              </CodeEditorIcon>
              <CodeEditorIcon
                onClick={closeActiveFile}
                rightmost={true}
                className="test-close-code-editor"
              >
                <CloseSVG height={svgHeight} />
              </CodeEditorIcon>
            </>
          ) : isMobile ? (
            <CodeEditorIcon
              onClick={closeActiveFile}
              className="test-close-code-editor-mobile"
            >
              <CloseSVG height={svgHeight} />
            </CodeEditorIcon>
          ) : (
            <CodeEditorIcon
              onClick={onShowViz}
              leftmost={true}
              rightmost={true}
              className="test-exit-full-editor"
            >
              <CloseSVG height={svgHeight} />
            </CodeEditorIcon>
          )}
        </Icons>
      </Header>
      <CodeArea text={text} onTextChange={onFileChange(activeFile)} />
    </Wrapper>
  ) : null;
};
