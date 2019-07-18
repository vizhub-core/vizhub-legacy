import React from 'react';
import { Wrapper } from './styles';

export const VizRunner = ({ rect }) => {
  if (!rect) {
    return null;
  }
  return (
    <Wrapper
      style={{
        top: rect.y + 'px',
        left: rect.x + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px'
      }}
    />
  );
};
