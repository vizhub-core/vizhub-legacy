import { useState, useEffect } from 'react';
import { waitForSpinner } from '../../LoadingScreen';
import { fakeDataLoaded } from '../fakeDataLoaded';

// TODO make an API request here, for the list of template and popular vizzes.
export const useCreateVizPageData = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    waitForSpinner(fakeDataLoaded()).then(() => {
      setLoading(false);
    });
  }, []);
  return !loading;
};
