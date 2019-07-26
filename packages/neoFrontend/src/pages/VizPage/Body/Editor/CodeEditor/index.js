import React, { useContext } from 'react';
import { URLStateContext } from '../../../URLStateContext';
import { isMobile, modShowViewer } from '../../../mobileMods';
import { SplitPaneResizeContext } from '../../../SplitPaneResizeContext';
import { FullSVG, CloseSVG } from '../../../../../svg';
//import { VizPageDataContext } from '../../../VizPageDataContext';
import { LargeIcon } from '../../styles';
import { Wrapper, Header, Icons, Content, MobileCloseIcon } from './styles';

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
              <LargeIcon onClick={onHideViz} leftmost={true}>
                <FullSVG />
              </LargeIcon>
              <LargeIcon onClick={closeActiveFile} rightmost={true}>
                <CloseSVG />
              </LargeIcon>
            </>
          ) : isMobile ? (
            <MobileCloseIcon onClick={closeActiveFile}>
              <CloseSVG height={15} />
            </MobileCloseIcon>
          ) : (
            <LargeIcon onClick={onShowViz} leftmost={true} rightmost={true}>
              <CloseSVG />
            </LargeIcon>
          )}
        </Icons>
      </Header>
      <Content>code goes here</Content>
    </Wrapper>
  ) : null;
};
