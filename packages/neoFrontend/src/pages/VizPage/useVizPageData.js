import { useState, useEffect, useContext } from 'react';
import { waitForSpinner } from '../../LoadingScreen';
import { URLStateContext } from './URLStateContext';
import { fetchVizPageData } from './fetchVizPageData';

export const useVizPageData = () => {
  const [data, setData] = useState(undefined);

  const { vizId } = useContext(URLStateContext);

  useEffect(() => {
    setData(undefined);

    const dataLoaded = fetchVizPageData(vizId);

    waitForSpinner(dataLoaded).then(setData);
  }, [vizId]);
  return data;
};
