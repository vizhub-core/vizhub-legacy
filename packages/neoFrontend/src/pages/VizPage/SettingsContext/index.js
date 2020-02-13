import React, { createContext, useContext } from 'react';
import { Modal } from '../../../Modal';
import { AuthContext } from '../../../authentication/AuthContext';
import { showPrivacySettings } from '../../../featureFlags';
import { HorizontalRule } from '../styles';
import { useSettings } from './useSettings';
import { RadioButton } from './RadioButton';
import { SetHeight } from './SetHeight';
import {
  Dialog,
  DialogTitle,
  Section,
  SectionTitle,
  SectionDescription,
  Spacer
} from './styles';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const {
    showSettingsModal,
    isShowingSettingsModal,
    hideSettingsModal,
    vizPrivacy,
    setVizPrivacy,
    vizHeight,
    setVizHeight,
    vizInfo
  } = useSettings();

  const { me } = useContext(AuthContext);

  return (
    <SettingsContext.Provider value={showSettingsModal}>
      {children}
      {isShowingSettingsModal ? (
        <Modal
          onClose={hideSettingsModal}
          closeButtonClassName="test-settings-dialog-close"
        >
          <Dialog>
            <DialogTitle>Settings</DialogTitle>
            {showPrivacySettings(me, vizInfo) ? (
              <>
                <Section>
                  <SectionTitle>Visibility</SectionTitle>
                  <SectionDescription>
                    Who can see your visualization.
                  </SectionDescription>
                  <RadioButton.Group
                    onChange={setVizPrivacy}
                    currentValue={vizPrivacy}
                  >
                    <RadioButton
                      value="public"
                      className="test-settings-dialog-radio-public"
                    />
                    <RadioButton
                      value="private"
                      className="test-settings-dialog-radio-private"
                    />
                  </RadioButton.Group>
                </Section>
                <Spacer />
                <HorizontalRule />
              </>
            ) : null}
            <Section>
              <SectionTitle>Height</SectionTitle>
              <SectionDescription>
                Set visualization height to control the aspect ratio (width is
                fixed at 960 pixels).
              </SectionDescription>
              <SetHeight height={vizHeight} setHeight={setVizHeight} />
            </Section>
          </Dialog>
        </Modal>
      ) : null}
    </SettingsContext.Provider>
  );
};
