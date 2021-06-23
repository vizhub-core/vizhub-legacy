import React, { useState, useEffect, useContext } from 'react';
import { RequireContext } from '../RequireContext';

export const App = () => {
  const [module, setModule] = useState({});
  const require = useContext(RequireContext);

  useEffect(() => {
    if (require) require('/build/client2.js').then(setModule);
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
