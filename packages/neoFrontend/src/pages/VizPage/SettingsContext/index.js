import React, { createContext, useContext, useCallback, useState } from 'react';
import { PRIVACY } from 'vizhub-presenters';
import { Button } from '../../../Button';
import { Modal } from '../../../Modal';
import { AuthContext } from '../../../authentication/AuthContext';
import { isPayingUser } from '../../../featureFlags';
import { HorizontalRule } from '../../../styles';
import {
  Dialog,
  DialogTitle,
  DialogButtons,
  Section,
  SectionTitle,
  SectionDescription,
  Spacer,
} from '../styles';
import { RadioButton } from '../RadioButton';
import { useSettings } from './useSettings';
import { SetHeight } from './SetHeight';
import { Ad } from './styles';

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
  } = useSettings();

  const { me } = useContext(AuthContext);

  const [showPrivacyAd, setShowPrivacyAd] = useState(false);

  const handlePrivacyChange = useCallback(
    (newVizPrivacy) => {
      if (!isPayingUser(me) && newVizPrivacy === PRIVACY.private) {
        setShowPrivacyAd(true);
      } else {
        setVizPrivacy(newVizPrivacy);
      }
    },
    [me, setShowPrivacyAd, setVizPrivacy]
  );

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
              <Section>
                <SectionTitle>Visibility</SectionTitle>
                <SectionDescription>
                  Who can see your visualization.
                  {showPrivacyAd && (
                    <Ad>
                      Please <a href="/pricing">upgrade your plan</a> to make
                      this viz private.
                    </Ad>
                  )}
                </SectionDescription>
                <RadioButton.Group onChange={handlePrivacyChange} currentValue={vizPrivacy}>
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
