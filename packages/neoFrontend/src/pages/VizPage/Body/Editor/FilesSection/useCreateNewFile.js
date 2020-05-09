import { useCallback } from 'react';
import { fileCreateOp } from 'vizhub-presenters';

export const useCreateNewFile = (
  setIsRenamingNewFile,
  submitVizContentOp,
  setActiveFile,
  files
) =>
  useCallback(
    (newName) => {
      setIsRenamingNewFile(false);
      // TODO refactor to dispatchCreateNewFile
      if (newName !== '') {
        submitVizContentOp(
          fileCreateOp(files, {
            name: newName,
            text: '',
          })
        );
        // Auto-open newly created files.
        setActiveFile(newName);
      }
    },
    [setIsRenamingNewFile, submitVizContentOp, files, setActiveFile]
  );
