import React, { createContext } from 'react';
import { useDeleteViz } from './useDeleteViz';
import { Modal } from './Modal';
import { withRouter } from 'react-router';

export const DeleteVizContext = createContext();

export const DeleteVizProvider = withRouter(({ children, history }) => {
  const {
    onDeleteViz,
    onDeleteVizCancel,
    isConfirmingDeleteViz
  } = useDeleteViz(history);

  return (
    <DeleteVizContext.Provider value={onDeleteViz}>
      {children}
      {isConfirmingDeleteViz ? (
        <Modal onClose={onDeleteVizCancel}>test</Modal>
      ) : null}
    </DeleteVizContext.Provider>
  );
});
