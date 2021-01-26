import { useState, useEffect } from 'react';
import { fetchProfilePageData } from './fetchProfilePageData';

const initialState = {
  user: null,
  visualizationInfos: [],
  error: null
}

export const useProfilePageData = (userName, query, sort) => {
  const [profilePageData, setProfilePageData] = useState(initialState)

  useEffect(
    () => {
      fetchProfilePageData({ userName, query, sort }).then(
        ({ user, visualizationInfos, error }) => {
          if (error && error.message === 'The requested user does not exist') {
            setProfilePageData({
              ...initialState,
              error: { message: 'User not found' }
            })
          }

          setProfilePageData({
            user,
            visualizationInfos,
            error: null
          })
        }
      );
    },
    [sort, userName, query, setProfilePageData]
  );

  return profilePageData;
};
