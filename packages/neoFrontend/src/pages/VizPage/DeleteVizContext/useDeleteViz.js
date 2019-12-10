import { useState, useContext, useCallback } from 'react';
import { minSpinnerTime } from '../../../constants';
import { AuthContext } from '../../../authentication/AuthContext';
import { ErrorContext } from '../../../ErrorContext';
import { waitForSpinner } from '../../../LoadingScreen';
import { VizContext } from '../VizContext';
import { fetchDeleteViz } from './fetchDeleteViz';

// TODO put this somewhere above all pages.
//const showAlertModal = message => {
//  const [isShowingAlertModal, setIsShowingAlertModal] = useState(false);
//  return isShowingAlertModal ? (
//    <Modal onClose={onDeleteSuccessAlertClose}>
//      <Modal.Message>{message}</Modal.Message>
//    </Modal>
//  ) : null;
//};

export const useDeleteViz = history => {
  const [isConfirmingDeleteViz, setIsConfirmingDeleteViz] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsDeleting(true);

    const viz = viz$.getValue();
    const dataLoaded = fetchDeleteViz(viz);

    if (!me) {
      return setError(new Error('You must be signed in to delete this viz.'));
    }

    waitForSpinner(dataLoaded, minSpinnerTime)
      .then(data => {
        if (data.error) {
          return setError(new Error(data.error));
        }
        history.push(`/${me.userName}`);
        // TODO make this work
        //showAlertModal('The viz has been deleted.');
      })
      .catch(error => {
        console.log(error);
      });
  }, [me, setError, viz$, history]);

  return {
    onDeleteViz,
    onDeleteVizCancel,
    isConfirmingDeleteViz,
    onDeleteVizConfirm,
    isDeleting
  };
};
