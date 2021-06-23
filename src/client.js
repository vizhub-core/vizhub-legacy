import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { require } from 'd3-require';

ReactDOM.hydrate(<App require={require} />, document.getElementById('root'));
