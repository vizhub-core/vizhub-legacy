import React, { useState, useEffect } from 'react';

export const App = ({ require }) => {
  const [module, setModule] = useState({});
  useEffect(() => {
    require &&
      require
        //TODO unify definition of globals, use across here and rollup config.
        .alias({ react: React, 'react-dom': ReactDOM })('./build/client2.js')
        .then(setModule);
  }, []);
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
