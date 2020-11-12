import React, { createContext, useState } from 'react';
import { showEmbed, showSnippet, showCollaborators } from '../../../featureFlags';
import { Button } from '../../../Button';
import { Modal } from '../../../Modal';
import {
  Dialog,
  DialogTitle,
  DialogButtons,
  Section,
  SectionTitle,
} from '../styles';
import { useShare } from './useShare';
import { Tabs, Tab } from './Tabs';
import { LinkBody } from './LinkBody';
import { EmbedBody } from './EmbedBody';
import { SnippetBody } from './SnippetBody';
import { CollaboratorsBody } from './CollaboratorsBody';

export const ShareContext = createContext();
const defaultActiveTab = 'link';

const TabBody = ({ activeTab }) =>
  activeTab === 'link' ? (
    <LinkBody />
  ) : activeTab === 'embed' ? (
    <EmbedBody />
  ) : activeTab === 'snippet' ? (
    <SnippetBody />
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
            <DialogTitle>Share</DialogTitle>
            <Section>
              <SectionTitle>SHARE WITH</SectionTitle>
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
                <Tab id="link">Link</Tab>
                {showEmbed ? <Tab id="embed">Embed</Tab> : null}
                {showSnippet ? <Tab id="snippet">Snippet</Tab> : null}
                {showCollaborators ? (
                  <Tab id="collaborators">Collaborators</Tab>
                ) : null}
              </Tabs>
              <TabBody activeTab={activeTab} />
            </Section>
            <DialogButtons>
              <Button isFilled onClick={hideShareModal}>
                Done
              </Button>
            </DialogButtons>
          </Dialog>
        </Modal>
      ) : null}
    </ShareContext.Provider>
  );
};
