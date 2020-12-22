import { useState, useContext, useCallback } from 'react';
import { waitForSpinner } from '../../../LoadingScreen';
import { AuthContext } from '../../../authentication/AuthContext';
import { ErrorContext } from '../../../ErrorContext';
import { minSpinnerTime } from '../../../constants';
import { VizContext } from '../VizContext';
import { fetchFork } from './fetchFork';

export const useForking = (history, { forkTitle }) => {
  const [isForking, setIsForking] = useState(false);

  const { viz$ } = useContext(VizContext);
  const { me } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);

  const onFork = useCallback(() => {
    // short circuit if no fork title was provided
    if(!forkTitle) return;

    setIsForking(true);

    const viz = viz$.getValue();
    const dataLoaded = fetchFork(viz, { forkTitle });

    if (!me) {
      return setError(new Error('You must be signed in to fork.'));
    }
    waitForSpinner(dataLoaded, minSpinnerTime).then((data) => {
      if (data.error) {
        return setError(new Error(data.error));
      }
      history.push(`/${me.userName}/${data.id}`);
    });
  }, [viz$, me, history, forkTitle, setError]);

  return { onFork, isForking };
};
