import { useState, useContext, useCallback } from 'react';
import { waitForSpinner } from '../../../LoadingScreen';
import { AuthContext } from '../../../authentication/AuthContext';
import { VizPageDataContext } from '../VizPageDataContext';
import { fetchFork } from './fetchFork';

export const useForking = history => {
  const [isForking, setIsForking] = useState(false);

  const { visualization } = useContext(VizPageDataContext);
  const { me } = useContext(AuthContext);

  const onFork = useCallback(() => {
    setIsForking(true);

    const dataLoaded = fetchFork(visualization);

    // Allow the tests to run fast in development.
    // Force the user to perceive the loading screen message in production.
    const minSpinnerTime = process.env.NODE_ENV === 'development' ? 0 : 2000;

    waitForSpinner(dataLoaded, minSpinnerTime).then(data => {
      if (data.error) {
        // TODO handle error case here - if user is not authenticated
        // How to display error? Generalize error message logic from auth page.
        // TODO add test case for this.
        console.log(data.error);
      }

      history.push(`/${me.userName}/${data.id}`);
    });
  }, [visualization, me.userName, history]);

  return { onFork, isForking };
};
