import React from 'react';

export const App = ({ pageData, pages }) => {
  const { pageName, pageProps } = pageData;
  const PageComponent = pages.get(pageName);

  return <PageComponent {...pageProps} />;
};
