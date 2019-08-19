import { useCallback } from 'react';
import { useValue } from '../../../../../useValue';
import { getVizFileIndex } from '../../../../../accessors';

export const useFileIndex = (viz$, activeFile) =>
  useValue(viz$, useCallback(getVizFileIndex(activeFile), [activeFile]));
