import React, { createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorContext } from '../../../ErrorContext';
import { useSearchQuery } from '../../../useSearchQuery';
import { useProfilePageData } from './useProfilePageData';
export const ProfilePageDataContext = createContext();

export const ProfilePageDataProvider = ({ fallback, children }) => {
  const { userName } = useParams();
  const { query, sort } = useSearchQuery();

  const profilePageData = useProfilePageData(userName, query, sort);
  const { setError } = useContext(ErrorContext);

  if (profilePageData && profilePageData.error) {
    setError(new Error('User not found.'));
    return null;
  }

  return profilePageData ? (
    <ProfilePageDataContext.Provider value={profilePageData}>
      {children}
    </ProfilePageDataContext.Provider>
  ) : (
    fallback
  );
};
