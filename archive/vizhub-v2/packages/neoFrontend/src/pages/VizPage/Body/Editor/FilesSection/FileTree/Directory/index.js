import React, { useCallback } from 'react';
import { DirectoryArrowSVG } from '../../../../../../../svg';
import { DirectoryEntry } from '../styles';
import { ArrowWrapper } from './styles';

export const Directory = ({ name, path, indent, isOpen, toggleDirectory }) => {
  const onClick = useCallback(() => {
    toggleDirectory(path);
  }, [toggleDirectory, path]);

  return (
    <DirectoryEntry indent={indent} onClick={onClick}>
      <ArrowWrapper indent={indent} rotate={isOpen ? 90 : 0}>
        <DirectoryArrowSVG />
      </ArrowWrapper>
      {name}
    </DirectoryEntry>
  );
};
