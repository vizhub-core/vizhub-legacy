import React, { useContext } from 'react';
import { URLStateContext } from '../../../URLStateContext';
//import { VizPageDataContext } from '../../../VizPageDataContext';
import { Wrapper } from './styles';

export const CodeEditor = () => {
  const { activeFile } = useContext(URLStateContext);
  //const { visualization } = useContext(VizPageDataContext);
  //const { files } = visualization.content;

  return activeFile ? <Wrapper /> : null;
};
