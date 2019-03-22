import React from 'react';
import { URLStateProvider } from './urlState';
import { StudioBody } from './StudioBody';

export const Studio = () => (
  <URLStateProvider>
    <StudioBody />
  </URLStateProvider>
);
