import React from 'react';
import ReactDOM from 'react-dom';
import { require } from 'd3-require';
import { aliases } from './globals';
import { App } from './App';
import { RequireContext } from './RequireContext';

ReactDOM.hydrate(
  <RequireContext.Provider value={require.alias(aliases())}>
    <App />
  </RequireContext.Provider>,
  document.getElementById('root')
);
