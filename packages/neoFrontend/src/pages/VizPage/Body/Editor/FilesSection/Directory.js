import React, { useCallback } from 'react';
import { FileEntry } from './styles';

export const Directory = ({ name, path, indent, toggleDirectory }) => {
  const onClick = useCallback(() => {
    toggleDirectory(path);
  }, [toggleDirectory, path]);

  return (
    <FileEntry indent={indent} onClick={onClick}>
      {name}
    </FileEntry>
  );
};
