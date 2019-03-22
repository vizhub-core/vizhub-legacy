import React, { useState, useEffect } from 'react';
import { URLStateProvider } from './urlState';
import { StudioBody } from './StudioBody';
import { LoadingScreen } from '../LoadingScreen';

export const Studio = () => {
  // TODO load data from server API / gateway.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return loaded ? (
    <URLStateProvider>
      <StudioBody />
    </URLStateProvider>
  ) : (
    <LoadingScreen />
  );
};
