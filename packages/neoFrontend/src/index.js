import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

// A place to put feature previews and easter eggs.
window.vizhub = {};

// Wait for prefetched fonts.
window.onload = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};
