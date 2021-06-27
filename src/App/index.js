import React from 'react';
import { TestPage } from './TestPage';
import { HomePage } from './HomePage';
import { VizPage } from './VizPage';
import { VizNotFoundPage } from './VizNotFoundPage';

const pages = { TestPage, HomePage, VizPage, VizNotFoundPage };

export const App = ({ page, pageProps }) => {
  const PageComponent = pages[page];
  return <PageComponent {...pageProps} />;
};
