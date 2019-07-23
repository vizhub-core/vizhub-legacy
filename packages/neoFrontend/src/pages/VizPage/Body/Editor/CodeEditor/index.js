import React, { useContext } from 'react';
import { URLStateContext } from '../../../URLStateContext';
import { FullSVG, CloseSVG } from '../../../../../svg';
//import { VizPageDataContext } from '../../../VizPageDataContext';
import { Wrapper, CodeEditorIcon } from './styles';

export const CodeEditor = () => {
  const {
    activeFile,
    showEditor,
    onHideViz,
    onShowViz,
    showViewer
  } = useContext(URLStateContext);
  //const { visualization } = useContext(VizPageDataContext);
  //const { files } = visualization.content;

  return activeFile ? (
    <Wrapper showLeftBorder={showEditor}>
      {showViewer ? (
        <CodeEditorIcon onClick={onHideViz}>
          <FullSVG />
        </CodeEditorIcon>
      ) : (
        <CodeEditorIcon onClick={onShowViz}>
          <CloseSVG />
        </CodeEditorIcon>
      )}
    </Wrapper>
  ) : null;
};
