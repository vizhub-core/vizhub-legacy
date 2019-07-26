import React, { useContext } from 'react';
import { getMicroScale, getMicroWidth } from '../../../../accessors';
import { VizPageDataContext } from '../../VizPageDataContext';
import { Wrapper, Output, CornerTitle, Scroller } from './styles';

export const MicroConsole = ({ consoleOutput }) => {
  const { visualization } = useContext(VizPageDataContext);
  const scale = getMicroScale(visualization);
  const width = window.innerWidth - getMicroWidth(scale);
  return (
    <Wrapper style={{ width }}>
      <Scroller>
        <Output>{consoleOutput}</Output>
      </Scroller>
      <CornerTitle>console</CornerTitle>
    </Wrapper>
  );
};
