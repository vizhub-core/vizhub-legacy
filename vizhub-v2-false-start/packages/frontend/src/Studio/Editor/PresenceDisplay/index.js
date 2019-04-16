import React from 'react';
import { Wrapper } from './styles';

export const PresenceDisplay = ({ data }) =>
  data
    ? data.map(({ x, y, height }, i) => (
        <Wrapper key={i} x={x} y={y} height={height} />
      ))
    : null;
