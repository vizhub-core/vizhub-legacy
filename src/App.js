import React, { useState, useEffect } from 'react';

export const App = ({ require }) => {
  const [module, setModule] = useState({});

  useEffect(() => {
    if (require) require('./build/client2.js').then(setModule);
  }, [require]);

  const { Client2 } = module;

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
