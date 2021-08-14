import React from 'react';
import { URLStateContextProvider } from './URLStateContext';

export const App = ({ pageData, pages, ssrQuery }) => {
  const { pageName, pageProps } = pageData;
  const PageComponent = pages.get(pageName);

  return (
    <URLStateContextProvider ssrQuery={ssrQuery}>
      <PageComponent {...pageProps} />
    </URLStateContextProvider>
  );
};
