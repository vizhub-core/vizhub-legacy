import React, { createContext, useCallback } from 'react';
import { Button } from '../../styles';
import { Modal } from '../../../Modal';
import { useShare } from './useShare';
import {
  Dialog,
  DialogTitle,
  DialogButtons,
  Section,
  SectionTitle,
  SectionDescription
} from './styles';

export const ShareContext = createContext();

export const ShareProvider = ({ children }) => {
  const { showShareModal, isShowingShareModal, hideShareModal } = useShare();

  // Make it so hitting Enter in a text input
  // closes the modal (equivalent to hitting the "Done" button.
  const onSubmit = useCallback(
    event => {
      hideShareModal();
      event.preventDefault();
    },
    [hideShareModal]
  );

  return (
    <ShareContext.Provider value={showShareModal}>
      {children}
      {isShowingShareModal ? (
        <Modal
          onClose={hideShareModal}
          closeButtonClassName="test-share-dialog-close"
        >
          <Dialog>
            <form onSubmit={onSubmit}>
              <DialogTitle>Share</DialogTitle>
              <Section>
                <SectionTitle>Share with</SectionTitle>
                <SectionDescription>
                  Set visualization height to control the aspect ratio (width is
                  fixed at 960 pixels).
                </SectionDescription>
              </Section>
              <DialogButtons>
                <Button isFilled onClick={hideShareModal}>
                  Done
                </Button>
              </DialogButtons>
            </form>
          </Dialog>
        </Modal>
      ) : null}
    </ShareContext.Provider>
  );
};
