import React, { createContext } from 'react';
import { Modal } from '../../../Modal';
import { usePrivacy } from './usePrivacy';
import { RadioButton } from './RadioButton';

export const PrivacyContext = createContext();

export const PrivacyProvider = ({ children }) => {
  const {
    showPrivacyModal,
    isShowingPrivacyModal,
    hidePrivacyModal,
    vizPrivacy,
    setVizPrivacy
  } = usePrivacy();

  return (
    <PrivacyContext.Provider value={showPrivacyModal}>
      {children}
      {isShowingPrivacyModal ? (
        <Modal onClose={hidePrivacyModal}>
          <Modal.Message>Privacy settings for this viz:</Modal.Message>
          <RadioButton.Group onChange={setVizPrivacy} currentValue={vizPrivacy}>
            <RadioButton value="public" />
            <RadioButton value="private" className="test-privacy-dialog-radio-private" />
          </RadioButton.Group>
        </Modal>
      ) : null}
    </PrivacyContext.Provider>
  );
};
