import React, { createContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchQuery } from '../../../useSearchQuery';
import { useProfilePageData } from './useProfilePageData';
export const ProfilePageDataContext = createContext();

export const ProfilePageDataProvider = ({ fallback, children, onError }) => {
  const { userName } = useParams();
  const { query, sort } = useSearchQuery();

  const profilePageData = useProfilePageData(userName, query, sort);

  useEffect(() => {
    if(profilePageData.error) {
      onError(profilePageData.error);
    }
  }, [onError, profilePageData.error]);
  
  if (profilePageData.error) {
    return null;
  }

  return profilePageData.user ? (
    <ProfilePageDataContext.Provider value={profilePageData}>
      {children}
    </ProfilePageDataContext.Provider>
  ) : (
    fallback
  );
};
