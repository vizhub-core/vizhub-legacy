import React, { useState, useEffect } from 'react';
import { LoadingScreen } from '../LoadingScreen';
import { PreferencesProvider } from '../preferences';
import { URLStateProvider } from './urlState';
import { StudioBody } from './StudioBody';

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
      <PreferencesProvider>
        <StudioBody />
      </PreferencesProvider>
    </URLStateProvider>
  ) : (
    <LoadingScreen />
  );
};
