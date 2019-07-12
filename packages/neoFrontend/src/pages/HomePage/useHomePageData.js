import { useState, useEffect } from 'react';
import { waitForSpinner } from '../../LoadingScreen';
import { fakeDataLoaded } from '../fakeDataLoaded';

export const useHomePageData = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    waitForSpinner(fakeDataLoaded()).then(() => {
      setLoading(false);
    });
  }, []);
  return !loading;
};
