import React, { createContext } from 'react';
import { withRouter } from 'react-router';
import { Modal } from '../../../Modal';
import { Button } from '../../styles';
import { useDeleteViz } from './useDeleteViz';

export const DeleteVizContext = createContext();

export const DeleteVizProvider = withRouter(
  ({ children, history, fallback }) => {
    const {
      onDeleteViz,
      onDeleteVizCancel,
      isConfirmingDeleteViz,
      onDeleteVizConfirm,
      isDeleting
    } = useDeleteViz(history);

    return !isDeleting ? (
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
    ) : (
      fallback
    );
  }
);
