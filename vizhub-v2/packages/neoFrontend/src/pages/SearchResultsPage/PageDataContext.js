import React, { createContext } from 'react';
import { usePageData } from './usePageData';

export const PageDataContext = createContext();

export const PageDataProvider = ({ fallback, children }) => {
  const pageData = usePageData();

  return pageData ? (
    <PageDataContext.Provider value={pageData}>
      {children}
    </PageDataContext.Provider>
  ) : (
    fallback
  );
};
