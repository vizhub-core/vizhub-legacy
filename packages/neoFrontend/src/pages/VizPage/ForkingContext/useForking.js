import { useState, useContext, useCallback } from 'react';
import { waitForSpinner } from '../../../LoadingScreen';
import { VizPageDataContext } from '../VizPageDataContext';
import { fetchFork } from './fetchFork';

export const useForking = () => {
  const [isForking, setIsForking] = useState(false);

  const { visualization } = useContext(VizPageDataContext);

  const onFork = useCallback(() => {
    setIsForking(true);
    console.log('Fork that shit');

    const dataLoaded = fetchFork(visualization);

    waitForSpinner(dataLoaded, 2000).then(data => {
      console.log('forking finished');
      setIsForking(false);
      console.log(data);
    });
  }, [visualization]);
  //
  return { onFork, isForking };
};
