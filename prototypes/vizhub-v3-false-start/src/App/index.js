import React from 'react';
import * as pages from './pages';

export const App = ({ page, pageProps }) => {
  const PageComponent = pages[page];
  return <PageComponent {...pageProps} />;
};
