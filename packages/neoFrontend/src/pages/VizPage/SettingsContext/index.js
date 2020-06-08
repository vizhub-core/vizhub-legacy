import React, { createContext, useContext, useCallback } from 'react';
import { Button } from '../../styles';
import { Modal } from '../../../Modal';
import { AuthContext } from '../../../authentication/AuthContext';
import { showPrivacySettings } from '../../../featureFlags';
import { RadioButton } from '../RadioButton';
import { HorizontalRule } from '../../styles';
import {
  Dialog,
  DialogTitle,
  DialogButtons,
  Section,
  SectionTitle,
  SectionDescription,
  Spacer,
} from '../styles';
import { useSettings } from './useSettings';
import { SetHeight } from './SetHeight';

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
    vizInfo,
  } = useSettings();

  const { me } = useContext(AuthContext);

  // Make it so hitting Enter in a text input
  // closes the modal (equivalent to hitting the "Done" button.
  const onSubmit = useCallback(
    (event) => {
      hideSettingsModal();
      event.preventDefault();
    },
    [hideSettingsModal]
  );

  return (
    <SettingsContext.Provider value={showSettingsModal}>
      {children}
      {isShowingSettingsModal ? (
        <Modal
          onClose={hideSettingsModal}
          closeButtonClassName="test-settings-dialog-close"
        >
          <Dialog>
            <form onSubmit={onSubmit}>
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
              <DialogButtons>
                <Button isFilled onClick={hideSettingsModal}>
                  Done
                </Button>
              </DialogButtons>
            </form>
          </Dialog>
        </Modal>
      ) : null}
    </SettingsContext.Provider>
  );
};
