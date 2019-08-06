import React, { useContext, useCallback } from 'react';
import { useValue } from '../../../../../../../useValue';
import { VizContext } from '../../../../../VizContext';
import { getVizFile, getVizFileIndex } from '../../../../../../../accessors';
import { Wrapper } from './styles';

export const CodeAreaPre = ({ activeFile }) => {
  const { viz$ } = useContext(VizContext);

  const fileIndex = useValue(
    viz$,
    useCallback(getVizFileIndex(activeFile), [activeFile])
  );

  const file = useValue(viz$, useCallback(getVizFile(fileIndex), [fileIndex]));

  return <Wrapper>{file.text}</Wrapper>;
};
