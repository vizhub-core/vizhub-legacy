import React, { createContext, useCallback } from 'react';
import { Modal } from '../../../Modal';
import { Button } from '../../styles';
import { usePrivacy } from './usePrivacy';
import { RadioButton } from './RadioButton';

export const PrivacyContext = createContext();

export const PrivacyProvider = ({ children }) => {
  const {
    showPrivacyModal,
    isShowingPrivacyModal,
    hidePrivacyModal
  } = usePrivacy();

  const onPrivacyOptionChange = useCallback(value => {
    console.log(value);
  }, []);

  return (
    <PrivacyContext.Provider value={showPrivacyModal}>
      {children}
      {isShowingPrivacyModal ? (
        <Modal onClose={hidePrivacyModal}>
          <Modal.Message>Privacy settings for this viz.</Modal.Message>
          <Button onClick={hidePrivacyModal}>Save</Button>
          <RadioButton.Group
            onChange={onPrivacyOptionChange}
            currentValue={'public'}
          >
            <RadioButton value="public" />
            <RadioButton value="private" />
          </RadioButton.Group>
        </Modal>
      ) : null}
    </PrivacyContext.Provider>
  );
};
