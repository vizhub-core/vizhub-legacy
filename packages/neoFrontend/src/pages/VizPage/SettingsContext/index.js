import React, { createContext } from 'react';
import { Modal } from '../../../Modal';
import { useSettings } from './useSettings';
import { RadioButton } from './RadioButton';
import { Input } from './Input';
import { Dialog, SectionTitle, SectionDescription } from './styles';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const {
    showSettingsModal,
    isShowingSettingsModal,
    hideSettingsModal,
    vizSettings,
    setVizSettings,
    vizHeight,
    setVizHeight
  } = useSettings();

  // TODO rename to SettingsContext
  return (
    <SettingsContext.Provider value={showSettingsModal}>
      {children}
      {isShowingSettingsModal ? (
        <Modal
          onClose={hideSettingsModal}
          closeButtonClassName="test-privacy-dialog-close"
        >
          <Dialog>
            <SectionTitle>Settings</SectionTitle>
            <SectionDescription>Visibility</SectionDescription>
            <RadioButton.Group
              onChange={setVizSettings}
              currentValue={vizSettings}
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
    </SettingsContext.Provider>
  );
};
