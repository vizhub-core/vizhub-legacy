import React, { useContext } from 'react';
import { URLStateContext } from '../../../URLStateContext';
import { FullSVG, CloseSVG } from '../../../../../svg';
//import { VizPageDataContext } from '../../../VizPageDataContext';
import { Wrapper, CodeEditorIcons, CodeEditorIcon } from './styles';

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

  return activeFile ? (
    <Wrapper showLeftBorder={showEditor}>
      <CodeEditorIcons>
        {showViewer ? (
          <>
            <CodeEditorIcon onClick={onHideViz}>
              <FullSVG />
            </CodeEditorIcon>
            <CodeEditorIcon onClick={closeActiveFile}>
              <CloseSVG />
            </CodeEditorIcon>
          </>
        ) : (
          <CodeEditorIcon onClick={onShowViz}>
            <CloseSVG />
          </CodeEditorIcon>
        )}
      </CodeEditorIcons>
    </Wrapper>
  ) : null;
};
