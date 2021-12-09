import React, { createContext } from 'react';
import { useHomePageData } from './useHomePageData';

export const HomePageDataContext = createContext();

export const HomePageDataProvider = ({ sort, fallback, children }) => {
  const homePageData = useHomePageData({ sort });

  return homePageData ? (
    <HomePageDataContext.Provider value={homePageData}>
      {children}
    </HomePageDataContext.Provider>
  ) : (
    fallback
  );
};
