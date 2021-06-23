import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { require } from 'd3-require';
import { aliases } from './globals';

ReactDOM.hydrate(
  <App require={require.alias(aliases())} />,
  document.getElementById('root')
);
