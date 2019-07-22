import React, { useContext } from 'react';
import { URLStateContext } from '../../../URLStateContext';
import { FullSVG } from '../../../../../svg';
//import { VizPageDataContext } from '../../../VizPageDataContext';
import { Wrapper, CodeEditorIcon } from './styles';

export const CodeEditor = () => {
  const { activeFile, showEditor, hideViz } = useContext(URLStateContext);
  //const { visualization } = useContext(VizPageDataContext);
  //const { files } = visualization.content;

  return activeFile ? (
    <Wrapper showLeftBorder={showEditor}>
      <CodeEditorIcon onClick={hideViz}>
        <FullSVG />
      </CodeEditorIcon>
    </Wrapper>
  ) : null;
};
