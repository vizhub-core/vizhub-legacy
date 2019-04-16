import React from 'react';
import { Wrapper } from './styles';

export const PresenceDisplay = ({ data }) =>
  data ? <Wrapper x={data.x} y={data.y} height={data.height} /> : null;
