import React, { createContext, useContext } from 'react';
import { withRouter } from 'react-router';
import { ErrorContext } from '../../../ErrorContext';
import { useProfilePageData } from './useProfilePageData';

export const ProfilePageDataContext = createContext();

export const ProfilePageDataProvider = withRouter(
  ({ match, fallback, children }) => {
    const { userName } = match.params;
    const profilePageData = useProfilePageData(userName);
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
  }
);
