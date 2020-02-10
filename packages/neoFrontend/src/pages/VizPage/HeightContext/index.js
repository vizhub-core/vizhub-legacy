import React, { createContext } from 'react';
import { Modal } from '../../../Modal';
import { useHeight } from './useHeight';
import { Input } from './Input';

export const HeightContext = createContext();

export const HeightProvider = ({ children }) => {
  const {
    showHeightModal,
    isShowingHeightModal,
    hideHeightModal,
    vizHeight,
    setVizHeight
  } = useHeight();

  return (
    <HeightContext.Provider value={showHeightModal}>
      {children}
      {isShowingHeightModal ? (
        <Modal
          onClose={hideHeightModal}
          closeButtonClassName="test-height-dialog-close"
        >
          <Modal.Message>Height settings for this viz:</Modal.Message>
          <Input value={vizHeight} onChange={setVizHeight} />
        </Modal>
      ) : null}
    </HeightContext.Provider>
  );
};
