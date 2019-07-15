import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../authentication';
import { LoadingScreen } from '../../LoadingScreen';
import { createVizFromScratch } from './createVizFromScratch';
import { withRouter } from 'react-router';

export const CreatingVizFromScratchPage = withRouter(({ history }) => {
  const { me } = useContext(AuthContext);

  useEffect(() => {
    createVizFromScratch(me, history);
  }, [me, history]);

  return <LoadingScreen message="Creating..." />;
});
