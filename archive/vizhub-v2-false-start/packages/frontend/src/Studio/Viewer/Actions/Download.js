import React from 'react';
import { DownloadSVG } from '../../../svg';
import { Action } from './Action';

export const Download = () => (
  <Action desktopOnly={true} svg={DownloadSVG}>
    Download
  </Action>
);
