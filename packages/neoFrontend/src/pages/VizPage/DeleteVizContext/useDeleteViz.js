import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../../authentication/AuthContext';
import { ErrorContext } from '../../../ErrorContext';
import { VizContext } from '../VizContext';
import { fetchDeleteViz } from './fetchDeleteViz';

export const useDeleteViz = history => {
  const [isConfirmingDeleteViz, setIsConfirmingDeleteViz] = useState(false);

  const { viz$ } = useContext(VizContext);
  const { me } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);

  const onDeleteViz = useCallback(() => {
    setIsConfirmingDeleteViz(true);
  }, []);

  const onDeleteVizCancel = useCallback(() => {
    setIsConfirmingDeleteViz(false);
  }, []);

  const onDeleteVizConfirm = useCallback(() => {
    setIsConfirmingDeleteViz(false);

    //const viz = viz$.getValue();
    //const dataLoaded = fetchDeleteViz(viz);

    //// Allow the tests to run fast in development.
    //// Force the user to perceive the loading screen message in production.
    //// TODO unify where this is defined.
    //const minSpinnerTime = showSpinner ? 2000 : 0;

    if (!me) {
      return setError(new Error('You must be signed in to delete this viz.'));
    }

    //waitForSpinner(dataLoaded, minSpinnerTime).then(data => {
    //  if (data.error) {
    //    return setError(new Error(data.error));
    //  }
    //  history.push(`/${me.userName}`);
    //  setIsAlertingDeleteVizSuccess(true);
    //});
  }, [me, setError]); //[viz$, history ]);

  return {
    onDeleteViz,
    onDeleteVizCancel,
    isConfirmingDeleteViz,
    onDeleteVizConfirm
  };
};
