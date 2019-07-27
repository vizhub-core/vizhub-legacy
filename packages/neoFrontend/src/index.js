import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

// Wait for prefetched fonts.
window.onload = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};
