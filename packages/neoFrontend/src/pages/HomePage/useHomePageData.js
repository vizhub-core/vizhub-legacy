import { useState, useEffect } from 'react';
import { waitForSpinner } from '../../LoadingScreen';
import { fetchHomePageData } from './fetchHomePageData';

export const useHomePageData = () => {
  const [homePageData, setHomePageData] = useState(null);
  useEffect(() => {
    waitForSpinner(fetchHomePageData()).then(data => {
      setHomePageData(data.reverse());
    });
  }, []);
  return homePageData;
};
