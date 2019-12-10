import React, { createContext } from 'react';
import { withRouter } from 'react-router';
import { Button } from '../../styles';
import { useDeleteViz } from './useDeleteViz';
import { Modal } from './Modal';

export const DeleteVizContext = createContext();

export const DeleteVizProvider = withRouter(({ children, history }) => {
  const {
    onDeleteViz,
    onDeleteVizCancel,
    isConfirmingDeleteViz,
    onDeleteVizConfirm
  } = useDeleteViz(history);

  return (
    <DeleteVizContext.Provider value={onDeleteViz}>
      {children}
      {isConfirmingDeleteViz ? (
        <Modal onClose={onDeleteVizCancel}>
          <Modal.Message>
            Are you sure you want to permanently delete this viz?
          </Modal.Message>
          <Button onClick={onDeleteVizConfirm}>Yes</Button>
        </Modal>
      ) : null}
    </DeleteVizContext.Provider>
  );
});
