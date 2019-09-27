import { useCallback } from 'react';
import { getFileIndex, fileChangeOp } from '../../../../../accessors';

export const useRenameActiveFile = (
  activeFile,
  setIsRenamingActiveFile,
  files,
  submitVizContentOp,
  realtimeModules
) =>
  useCallback(
    newName => {
      setIsRenamingActiveFile(false);
      submitVizContentOp(
        fileChangeOp(
          getFileIndex(files, activeFile),
          activeFile,
          newName,
          realtimeModules,
          'name'
        )
      );
    },
    [
      activeFile,
      setIsRenamingActiveFile,
      files,
      submitVizContentOp,
      realtimeModules
    ]
  );
