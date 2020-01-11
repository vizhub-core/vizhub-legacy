import React from 'react';
import { PlayPauseSVG } from '../../../../../../svg';
//import { Wrapper } from './styles';
export const PlayPauseControl = ({ runTimerProgress }) => (
  <PlayPauseSVG runTimerProgress={runTimerProgress} />
);
