import React, { useCallback } from 'react';
import { DirectoryArrowSVG } from '../../../../../svg';
import { DirectoryEntry } from './styles';

import styled from 'styled-components';

//const Wrapper = styled.div`
//  display: flex;
//  align-items: center;
//  position: relative;
//`;
//
const arrowXOffset = 2;
const ArrowWrapper = styled.div`
  position: absolute;
  left: ${props =>
    props.theme.editorEntryHorizontalPadding +
    props.theme.editorEntryIndentation * (props.indent - 1) -
    arrowXOffset}px;
`;

export const Directory = ({ name, path, indent, toggleDirectory }) => {
  const onClick = useCallback(() => {
    toggleDirectory(path);
  }, [toggleDirectory, path]);

  return (
    <DirectoryEntry indent={indent} onClick={onClick}>
      <ArrowWrapper indent={indent}>
        <DirectoryArrowSVG />
      </ArrowWrapper>
      {name}
    </DirectoryEntry>
  );
};
