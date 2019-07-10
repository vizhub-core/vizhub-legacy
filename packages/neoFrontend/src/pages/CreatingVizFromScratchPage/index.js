import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../authentication';
import { LoadingScreen } from '../../LoadingScreen';
import { createVizFromScratch } from './createVizFromScratch';

export const CreatingVizFromScratchPage = () => {
  const { me } = useContext(AuthContext);

  useEffect(() => {
    createVizFromScratch(me);
  }, [me]);

  return <LoadingScreen message="Creating..." />;
};
