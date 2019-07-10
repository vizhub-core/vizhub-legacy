import React, { createContext } from 'react';
import { useCreateVizPageData } from './useCreateVizPageData';

export const CreateVizPageDataContext = createContext();

export const CreateVizPageDataProvider = ({ fallback, children }) => {
  const homePageData = useCreateVizPageData();

  return homePageData ? (
    <CreateVizPageDataContext.Provider value={homePageData}>
      {children}
    </CreateVizPageDataContext.Provider>
  ) : (
    fallback
  );
};
