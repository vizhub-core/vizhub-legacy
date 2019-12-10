import { useState, useContext, useCallback } from 'react';
import { waitForSpinner } from '../../../LoadingScreen';
import { AuthContext } from '../../../authentication/AuthContext';
import { ErrorContext } from '../../../ErrorContext';
import { minSpinnerTime } from '../../../constants';
import { VizContext } from '../VizContext';
import { fetchFork } from './fetchFork';

export const useForking = history => {
  const [isForking, setIsForking] = useState(false);

  const { viz$ } = useContext(VizContext);
  const { me } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);

  const onFork = useCallback(() => {
    setIsForking(true);

    const viz = viz$.getValue();
    const dataLoaded = fetchFork(viz);

    if (!me) {
      return setError(new Error('You must be signed in to fork.'));
    }
    waitForSpinner(dataLoaded, minSpinnerTime).then(data => {
      if (data.error) {
        return setError(new Error(data.error));
      }
      history.push(`/${me.userName}/${data.id}`);
    });
  }, [viz$, me, history, setError]);

  return { onFork, isForking };
};
