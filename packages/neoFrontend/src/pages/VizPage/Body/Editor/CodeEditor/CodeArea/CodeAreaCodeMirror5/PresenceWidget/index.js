import React from 'react';
import { Wrapper } from './styles';

export const PresenceWidget = ({ charWidth, userColor, height }) => {
  return (
    <Wrapper
      style={{
        borderRightWidth: charWidth + 'px',
        borderRightColor: userColor,
        height: `${height}px`,
      }}
    ></Wrapper>
  );
};
