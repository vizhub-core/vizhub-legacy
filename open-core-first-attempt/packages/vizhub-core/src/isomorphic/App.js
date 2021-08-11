import React from 'react';
import { URLStateContextProvider } from './URLStateContext';

export const App = ({ pageData, pages, query }) => {
  const { pageName, pageProps } = pageData;
  const PageComponent = pages.get(pageName);

  return (
    <URLStateContextProvider query={query}>
      <PageComponent {...pageProps} />
    </URLStateContextProvider>
  );
};
