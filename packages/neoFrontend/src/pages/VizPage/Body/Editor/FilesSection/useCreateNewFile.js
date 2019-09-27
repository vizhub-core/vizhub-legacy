import { useCallback } from 'react';
import { fileCreateOp } from '../../../../../accessors';

export const useCreateNewFile = (
  setIsRenamingNewFile,
  submitVizContentOp,
  files
) =>
  useCallback(
    newName => {
      setIsRenamingNewFile(false);
      if (newName !== '') {
        submitVizContentOp(
          fileCreateOp(files, {
            name: newName,
            text: ''
          })
        );
      }
    },
    [setIsRenamingNewFile, submitVizContentOp, files]
  );
