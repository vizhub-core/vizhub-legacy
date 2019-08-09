import React, { useContext, useCallback } from 'react';
import { useValue } from '../../../../../../../useValue';
import { VizContext } from '../../../../../VizContext';
import { getVizFile } from '../../../../../../../accessors';
import { useFileIndex } from '../useFileIndex';
import { Wrapper } from './styles';

export const CodeAreaPre = ({ activeFile }) => {
  const { viz$ } = useContext(VizContext);

  const fileIndex = useFileIndex(viz$, activeFile);

  const file = useValue(viz$, useCallback(getVizFile(fileIndex), [fileIndex]));

  return <Wrapper>{file.text}</Wrapper>;
};
