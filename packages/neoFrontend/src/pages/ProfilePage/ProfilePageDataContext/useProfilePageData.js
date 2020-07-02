import { useState, useEffect } from 'react';
import { waitForSpinner } from '../../../LoadingScreen';
import { useSearchQuery } from '../../../useSearchQuery';
import { fetchProfilePageData } from './fetchProfilePageData';

export const useProfilePageData = (userName) => {
  const query = useSearchQuery('query');
  const [data, setData] = useState(undefined);

  useEffect(() => {
    setData(undefined);
    const dataLoaded = fetchProfilePageData(userName, query);
    waitForSpinner(dataLoaded).then(setData);
  }, [userName, query]);

  return data;
};
