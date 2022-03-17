import React from 'react';
import * as presenters from './presenters';

export const App = ({ pageData }) => {
  const PagePresenter = presenters[pageData.pageName];
  return <PagePresenter pageData={pageData} />;
};
