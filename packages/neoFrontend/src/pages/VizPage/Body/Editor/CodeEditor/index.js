import React, { useContext } from 'react';
import { URLStateContext } from '../../../URLStateContext';
import { isMobile, modShowViewer } from '../../../mobileMods';
import { SplitPaneResizeContext } from '../../../SplitPaneResizeContext';
import { FullSVG, CloseSVG } from '../../../../../svg';
//import { VizPageDataContext } from '../../../VizPageDataContext';
import { Wrapper, Header, Icons, Content, CodeEditorIcon } from './styles';

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
  //const { visualization } = useContext(VizPageDataContext);
  //const { files } = visualization.content;

  const { codeEditorWidth } = useContext(SplitPaneResizeContext);

  const viewer = modShowViewer(showViewer, showEditor, activeFile);

  return activeFile ? (
    <Wrapper
      showLeftBorder={showEditor}
      style={viewer ? { width: codeEditorWidth + 'px' } : { flex: 1 }}
    >
      <Header>
        {activeFile}
        <Icons>
          {viewer ? (
            <>
              <CodeEditorIcon onClick={onHideViz} leftmost={true}>
                <FullSVG height={svgHeight} />
              </CodeEditorIcon>
              <CodeEditorIcon onClick={closeActiveFile} rightmost={true}>
                <CloseSVG height={svgHeight} />
              </CodeEditorIcon>
            </>
          ) : isMobile ? (
            <CodeEditorIcon onClick={closeActiveFile}>
              <CloseSVG height={svgHeight} />
            </CodeEditorIcon>
          ) : (
            <CodeEditorIcon
              onClick={onShowViz}
              leftmost={true}
              rightmost={true}
            >
              <CloseSVG height={svgHeight} />
            </CodeEditorIcon>
          )}
        </Icons>
      </Header>
      <Content>code goes here</Content>
    </Wrapper>
  ) : null;
};
