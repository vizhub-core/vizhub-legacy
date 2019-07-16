import { useState, useContext, useCallback } from 'react';
import { waitForSpinner } from '../../../LoadingScreen';
import { URLStateContext } from '../URLStateContext';
//import { fetchForking } from './fetchForking';
import { fakeDataLoaded } from '../../fakeDataLoaded';

export const useForking = () => {
  const [isForking, setIsForking] = useState(false);

  const { vizId } = useContext(URLStateContext);

  const onFork = useCallback(() => {
    setIsForking(true);
    console.log('Fork id ' + vizId);
    //const dataLoaded = fetchForking(vizId);
    const dataLoaded = fakeDataLoaded();

    // TODO force spinner to appear for min 2 seconds.
    waitForSpinner(dataLoaded).then(data => {
      console.log('forking finished');
      console.log(data);
    });
  }, [vizId]);
  //
  return { onFork, isForking };
};
