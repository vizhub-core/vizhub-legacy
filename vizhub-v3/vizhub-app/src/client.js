import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

// Underlying Philosophy: Client side navigation is not required.
// Therefore, the App component accepts only static pageData
// that was rendered into the HTML on the server side (see indexHTML.js).
ReactDOM.hydrate(
  <App pageData={window.pageData} />,
  document.getElementById('vizhub-root')
);
