import React, { createContext, useState } from 'react';
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
} from '../styles';
import { Tabs, Tab } from './Tabs';

export const ShareContext = createContext();
const defaultActiveTab = 'link';

const LinkBody = () => (
  <SectionDescription>
    Sharing this link on social media will automatically create a preview of
    your visualization.
  </SectionDescription>
);

const EmbedBody = () => (
  <SectionDescription>Embed Preview Image</SectionDescription>
);

const CollaboratorsBody = () => (
  <SectionDescription>
    Start typing to search available collaborators for this visualization.
  </SectionDescription>
);

const TabBody = ({ activeTab }) =>
  activeTab === 'link' ? (
    <LinkBody />
  ) : activeTab === 'embed' ? (
    <EmbedBody />
  ) : (
    <CollaboratorsBody />
  );

export const ShareProvider = ({ children }) => {
  const { showShareModal, isShowingShareModal, hideShareModal } = useShare();
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <ShareContext.Provider value={showShareModal}>
      {children}
      {isShowingShareModal ? (
        <Modal
          onClose={hideShareModal}
          closeButtonClassName="test-share-dialog-close"
        >
          <Dialog>
            <form>
              <DialogTitle>Share</DialogTitle>
              <Section>
                <SectionTitle>SHARE WITH</SectionTitle>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
                  <Tab id="link">Link</Tab>
                  <Tab id="embed">Embed</Tab>
                  <Tab id="collaborators">Collaborators</Tab>
                </Tabs>
                <TabBody activeTab={activeTab} />
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
