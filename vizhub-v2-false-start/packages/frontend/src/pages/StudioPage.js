import React from 'react';
import { useState, useEffect } from 'react';
import { LoadingScreen } from '../LoadingScreen';
import { Studio } from '../Studio';

export const StudioPage = ({ urlState }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return loaded ? <Studio /> : <LoadingScreen />;
};
