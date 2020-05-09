import { useState, useContext, useCallback } from 'react';
import { minSpinnerTime } from '../../../constants';
import { AuthContext } from '../../../authentication/AuthContext';
import { ErrorContext } from '../../../ErrorContext';
import { AlertDialogContext } from '../../../AlertDialogContext';
import { waitForSpinner } from '../../../LoadingScreen';
import { VizContext } from '../VizContext';
import { fetchDeleteViz } from './fetchDeleteViz';

export const useDeleteViz = (history) => {
  const [isConfirmingDeleteViz, setIsConfirmingDeleteViz] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { viz$ } = useContext(VizContext);
  const { me } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);
  const showAlertModal = useContext(AlertDialogContext);

  const onDeleteViz = useCallback(() => {
    setIsConfirmingDeleteViz(true);
  }, []);

  const onDeleteVizCancel = useCallback(() => {
    setIsConfirmingDeleteViz(false);
  }, []);

  const onDeleteVizConfirm = useCallback(() => {
    setIsConfirmingDeleteViz(false);
    setIsDeleting(true);

    const viz = viz$.getValue();
    const dataLoaded = fetchDeleteViz(viz);

    if (!me) {
      return setError(new Error('You must be signed in to delete this viz.'));
    }

    waitForSpinner(dataLoaded, minSpinnerTime)
      .then((data) => {
        if (data.error) {
          return setError(new Error(data.error));
        }
        history.push(`/${me.userName}`);
        showAlertModal('The viz has been deleted.');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [me, setError, viz$, history, showAlertModal]);

  return {
    onDeleteViz,
    onDeleteVizCancel,
    isConfirmingDeleteViz,
    onDeleteVizConfirm,
    isDeleting,
  };
};
