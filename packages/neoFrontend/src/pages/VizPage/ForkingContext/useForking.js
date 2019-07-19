import { useState, useContext, useCallback } from 'react';
import { waitForSpinner } from '../../../LoadingScreen';
import { AuthContext } from '../../../authentication/AuthContext';
import { ErrorContext } from '../../../ErrorContext';
import { showSpinner } from '../../../constants';
import { VizPageDataContext } from '../VizPageDataContext';
import { fetchFork } from './fetchFork';

export const useForking = history => {
  const [isForking, setIsForking] = useState(false);

  const { visualization } = useContext(VizPageDataContext);
  const { me } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);

  const onFork = useCallback(() => {
    setIsForking(true);

    const dataLoaded = fetchFork(visualization);

    // Allow the tests to run fast in development.
    // Force the user to perceive the loading screen message in production.
    const minSpinnerTime = showSpinner ? 2000 : 0;

    if (!me) {
      return setError(new Error('You must be signed in to fork.'));
    }
    waitForSpinner(dataLoaded, minSpinnerTime).then(data => {
      if (data.error) {
        return setError(new Error(data.error));
      }
      history.push(`/${me.userName}/${data.id}`);
    });
  }, [visualization, me, history, setError]);

  return { onFork, isForking };
};
