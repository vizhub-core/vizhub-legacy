import React, { createContext } from 'react';
import { useCreateVizPageData } from './useCreateVizPageData';

export const CreateVizPageDataContext = createContext();

export const CreateVizPageDataProvider = ({ fallback, children }) => {
  const createVizPageData = useCreateVizPageData();

  return createVizPageData ? (
    <CreateVizPageDataContext.Provider value={createVizPageData}>
      {children}
    </CreateVizPageDataContext.Provider>
  ) : (
    fallback
  );
};
