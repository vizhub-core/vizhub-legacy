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
      const fileIndex = getFileIndex(files, activeFile);
      const op = fileChangeOp(
        fileIndex,
        activeFile,
        newName,
        realtimeModules,
        'name'
      );
      if (op.length > 0) {
        submitVizContentOp(op);
      }
    },
    [
      activeFile,
      setIsRenamingActiveFile,
      files,
      submitVizContentOp,
      realtimeModules
    ]
  );
