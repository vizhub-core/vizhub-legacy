import { useState, useEffect } from 'react';
import { waitForSpinner } from '../../../LoadingScreen';
import { fetchProfilePageData } from './fetchProfilePageData';

export const useProfilePageData = (userName) => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    setData(undefined);
    const dataLoaded = fetchProfilePageData(userName);
    waitForSpinner(dataLoaded).then(setData);
  }, [userName]);

  return data;
};
