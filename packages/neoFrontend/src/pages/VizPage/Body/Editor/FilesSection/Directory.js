import React, { useCallback } from 'react';
import { DirectoryArrowSVG } from '../../../../../svg';
import { DirectoryEntry } from './styles';

import styled from 'styled-components';

const arrowXOffset = 2;
const ArrowWrapper = styled.div`
  position: absolute;
  left: ${props =>
    props.theme.editorEntryHorizontalPadding +
    props.theme.editorEntryIndentation * (props.indent - 1) -
    arrowXOffset}px;
  transition: transform 150ms;
  transform: rotate(${props => props.rotate}deg);
`;

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
