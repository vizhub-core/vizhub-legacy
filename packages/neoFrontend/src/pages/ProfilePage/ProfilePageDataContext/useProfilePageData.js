import { useState, useEffect } from 'react';
import { fetchProfilePageData } from './fetchProfilePageData';

const initialState = {
  user: null,
  section: 'public',
  visualizationInfos: [],
  error: null,
};

export const useProfilePageData = (userName, query, sort, section) => {
  const [profilePageData, setProfilePageData] = useState(initialState);

  useEffect(() => {
    fetchProfilePageData({ userName, query, sort, section }).then(
      ({ user, visualizationInfosBySection, error }) => {

        if (error && error.message === 'The requested user does not exist') {
          setProfilePageData({
            ...initialState,
            section,
            error: { message: 'User not found' },
          });
        } else {
          setProfilePageData({
            user,
            visualizationInfos: visualizationInfosBySection[section],
            section,
            error: null,
          });
        }
      }
    );
  }, [sort, userName, query, section, setProfilePageData]);

  return profilePageData;
};
