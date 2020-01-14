import { useCallback } from 'react';
import { getVizFileIndex } from 'vizhub-presenters';
import { useValue } from '../../../../../useValue';

export const useFileIndex = (viz$, activeFile) =>
  useValue(viz$, useCallback(getVizFileIndex(activeFile), [activeFile]));
