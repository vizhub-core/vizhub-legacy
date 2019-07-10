import React, { useContext } from 'react';
import { fetchCreateVizFromScratch } from './fetchCreateVizFromScratch';
import { AuthContext } from '../../authentication';
import { Title, Button, DevsOnly } from '../styles';

export const FromScratchSection = () => {
  const { me } = useContext(AuthContext);

  const createVizFromScratch = () => {
    const { error, id } = fetchCreateVizFromScratch();
    if (error) {
      console.log(error);
    } else {
      const userName = me.userName;
      console.log('route to ' + userName + '/' + id);
      //Router.push(vizRoute({ id, userName }));
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  return (
    <>
      <DevsOnly>
        <Title>For developers only</Title>
      </DevsOnly>
      <Button
        className="test-create-viz-from-scratch"
        onClick={createVizFromScratch}
      >
        From Scratch
      </Button>
    </>
  );
};
