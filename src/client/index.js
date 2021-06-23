// This is the entry point that runs in the browser only.
import React from 'react';
import ReactDOM from 'react-dom';
import { require } from 'd3-require';
import { aliases } from '../globals';
import { App } from '../App';
import { RequireContext } from './RequireContext';

const { page, pageProps } = JSON.parse(atob(window.pageData));

ReactDOM.hydrate(
  <RequireContext.Provider value={require.alias(aliases())}>
    <App page={page} pageProps={pageProps} />
  </RequireContext.Provider>,
  document.getElementById('root')
);
