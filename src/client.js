import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { require } from 'd3-require';

ReactDOM.hydrate(<App />, document.getElementById('root'));

require('./build/client2.js').then((test) => {
  console.log(test);
});
