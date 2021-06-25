import React from 'react';
import { HomePage } from './HomePage';
import { VizPage } from './VizPage';
import { VizNotFoundPage } from './VizNotFoundPage';

const pages = { HomePage, VizPage, VizNotFoundPage };

export const App = ({ page, pageProps }) => {
  const Page = pages[page];
  return <Page {...pageProps} />;
};
