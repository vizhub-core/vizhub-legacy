import React, { createContext } from 'react';
import { Modal } from '../../../Modal';
import { usePrivacy } from './usePrivacy';
import { RadioButton } from './RadioButton';
import { Input } from './Input';
import { Dialog, SectionTitle, SectionDescription } from './styles';

export const PrivacyContext = createContext();

export const PrivacyProvider = ({ children }) => {
  const {
    showPrivacyModal,
    isShowingPrivacyModal,
    hidePrivacyModal,
    vizPrivacy,
    setVizPrivacy,
    vizHeight,
    setVizHeight
  } = usePrivacy();

  // TODO rename to SettingsContext
  return (
    <PrivacyContext.Provider value={showPrivacyModal}>
      {children}
      {isShowingPrivacyModal ? (
        <Modal
          onClose={hidePrivacyModal}
          closeButtonClassName="test-privacy-dialog-close"
        >
          <Dialog>
            <SectionTitle>Settings</SectionTitle>
            <SectionDescription>Visibility</SectionDescription>
            <RadioButton.Group
              onChange={setVizPrivacy}
              currentValue={vizPrivacy}
            >
              <RadioButton
                value="public"
                className="test-privacy-dialog-radio-public"
              />
              <RadioButton
                value="private"
                className="test-privacy-dialog-radio-private"
              />
            </RadioButton.Group>
            <Input value={vizHeight} onChange={setVizHeight} />
          </Dialog>
        </Modal>
      ) : null}
    </PrivacyContext.Provider>
  );
};
