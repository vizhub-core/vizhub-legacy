import React, { createContext } from 'react';
import { Modal } from '../../../Modal';
import { Button } from '../../styles';
import { usePrivacy } from './usePrivacy';

export const PrivacyContext = createContext();

export const PrivacyProvider = ({ children }) => {
  const {
    showPrivacyModal,
    isShowingPrivacyModal,
    hidePrivacyModal
  } = usePrivacy();

  return (
    <PrivacyContext.Provider value={showPrivacyModal}>
      {children}
      {isShowingPrivacyModal ? (
        <Modal onClose={hidePrivacyModal}>
          <Modal.Message>Privacy settings for this viz.</Modal.Message>
          <Button onClick={hidePrivacyModal}>Save</Button>
        </Modal>
      ) : null}
    </PrivacyContext.Provider>
  );
};
