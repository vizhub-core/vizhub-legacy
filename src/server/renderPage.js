import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../App';
import { indexHTML } from '../indexHTML';

export const renderPage = ({ title, page, pageProps }) => {
  const rootHTML = renderToString(<App page={page} pageProps={pageProps} />);
  return indexHTML({ title, page, pageProps, rootHTML });
};
