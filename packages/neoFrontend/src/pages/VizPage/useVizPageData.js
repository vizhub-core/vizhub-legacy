import { useState, useEffect, useContext } from 'react';
import { waitForSpinner } from '../../LoadingScreen';
import { fakeDataLoaded } from '../fakeDataLoaded';
import { URLStateContext } from './URLStateContext';

// TODO make an API request here, for the viz content required.
export const useVizPageData = () => {
  const [loading, setLoading] = useState(true);

  const { vizId } = useContext(URLStateContext);

  useEffect(() => {
    setLoading(true);
    const dataLoaded = fakeDataLoaded();
    console.log('TODO fetch data for ' + vizId);
    waitForSpinner(dataLoaded).then(data => {
      console.log(data);
      setLoading(false);
    });
  }, [vizId]);
  return !loading;
};
