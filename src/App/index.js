import React from 'react';
import { useModule } from '../client/useModule';

export const App = () => {
  const { Client2 } = useModule('/build/client2.js');

  return (
    <div
      onClick={() => {
        console.log('clicked');
      }}
    >
      Hello React JSX
      {Client2 ? <Client2 /> : 'Loading...'}
    </div>
  );
};
