import { useState, useEffect, useContext } from 'react';
import { waitForSpinner } from '../../LoadingScreen';
import { URLStateContext } from './URLStateContext';
import { fetchVizPageData } from './fetchVizPageData';

export const useVizPageData = () => {
  const [loading, setLoading] = useState(true);

  const { vizId } = useContext(URLStateContext);

  useEffect(() => {
    setLoading(true);

    const dataLoaded = fetchVizPageData(vizId);

    console.log('TODO fetch data for ' + vizId);
    waitForSpinner(dataLoaded).then(data => {
      console.log(data);
      setLoading(false);
    });
  }, [vizId]);
  return !loading;
};
