// TODO rename this file to HomePageDataContext
import React, { createContext } from 'react';
import { useHomePageData } from './useHomePageData';

export const HomePageDataContext = createContext();

export const HomePageDataProvider = ({ fallback, children }) => {
  const homePageData = useHomePageData();

  return homePageData ? (
    <HomePageDataContext.Provider value={homePageData}>
      {children}
    </HomePageDataContext.Provider>
  ) : (
    fallback
  );
};
