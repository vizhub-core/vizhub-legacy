import { useState, useEffect } from 'react';
import { waitForSpinner } from '../../../LoadingScreen';
import { fetchProfilePageData } from './fetchProfilePageData';

export const useProfilePageData = (userName, query, sort) => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const dataLoaded = fetchProfilePageData({ userName, query, sort });
    waitForSpinner(dataLoaded).then(setData);
  }, [userName, query, sort]);

  return data;
};
