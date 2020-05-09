import { useState, useCallback } from 'react';
import { initialOpenDirectories } from './initialOpenDirectories';

export const useOpenDirectories = (activeFile) => {
  const [openDirectories, setOpenDirectories] = useState(
    initialOpenDirectories(activeFile)
  );

  const toggleDirectory = useCallback(
    (directory) => {
      setOpenDirectories(
        Object.assign({}, openDirectories, {
          [directory]: !openDirectories[directory],
        })
      );
    },
    [openDirectories, setOpenDirectories]
  );
  return { openDirectories, toggleDirectory };
};
