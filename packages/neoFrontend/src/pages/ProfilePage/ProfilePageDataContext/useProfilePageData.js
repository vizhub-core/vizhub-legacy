import { useState, useEffect, useRef } from 'react';
import { fetchProfilePageData } from './fetchProfilePageData';

const initialState = {
  user: null,
  section: 'public',
  visualizationInfos: [],
  error: null,
};

export const useProfilePageData = (userName, query, sort, section) => {
  const isDataLoadedRef = useRef(false);
  const [profilePageData, setProfilePageData] = useState(initialState);

  useEffect(() => {
    if (isDataLoadedRef.current) return;

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

        isDataLoadedRef.current = true;
      }
    );
  }, [isDataLoadedRef, sort, userName, query, section, setProfilePageData]);

  return {
    ...profilePageData,
    section,
  };
};
