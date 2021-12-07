import { useState, useCallback } from 'react';
import { Container, Button, Nav } from 'react-bootstrap';
import { classed } from './classed';
import { Navigation } from './Navigation';
import { ShareModal } from './ShareModal';
import { ForkModal } from './ForkModal';
import { MarkdownExample } from './MarkdownExample';

const Wrapper = classed('viz-page');
const TopbarRight = classed('topbar-right');
const Icon = classed('vizhub-icon');
const VizViewer = classed('viz-viewer');
const VizFrame = classed('viz-frame', 'svg');
const Title = classed('title', 'h4');
const VerticalSplit = classed('vertical-split');
const EditorContent = classed('editor-content');
const Items = classed('editor-items');
const Item = classed('editor-item clickable');
const Header = classed('editor-content-header');
const HeaderLeft = classed('header-left');
const HeaderRight = classed('header-right');

export const VizPage = () => {
  // Inspired by
  // https://react-bootstrap.github.io/components/modal/#modals-live
  const [showShareModal, setShowShareModal] = useState(false);
  const [showForkModal, setShowForkModal] = useState(false);

  const [showEditor, setShowEditor] = useState(false);
  const [activeFile, setActiveFile] = useState(null);

  // Clicking on the already open item will close it.
  const handleSelectFile = useCallback(
    (eventKey) => {
      setActiveFile(activeFile === eventKey ? null : eventKey);
    },
    [activeFile]
  );

  const handleCloseEditorContent = useCallback(() => {
    setActiveFile(null);
  }, []);

  const handleCloseShareModal = useCallback(() => setShowShareModal(false), []);
  const handleShowShareModal = useCallback(() => setShowShareModal(true), []);
  const handleCloseForkModal = useCallback(() => setShowForkModal(false), []);
  const handleShowForkModal = useCallback(() => setShowForkModal(true), []);
  const title = 'Test Title';
  const height = 500;

  const handleToggleEditor = useCallback(
    () => setShowEditor(!showEditor),
    [showEditor]
  );

  return (
    <Wrapper>
      <Navigation />
      <div className={`topbar${activeFile ? ' file-is-open' : ''}`}>
        <Button
          variant="white"
          onClick={handleToggleEditor}
          className={`editor-toggle flat d-flex align-items-center clickable`}
        >
          <div
            className={`vizhub-icon editor-toggle-icon icon-chevron ${
              showEditor ? 'right' : 'left'
            }`}
          />
          {showEditor ? 'Close' : 'Open'} Editor
        </Button>
        <TopbarRight>
          <Button
            variant="white"
            onClick={handleShowShareModal}
            className="flat vizhub-icon icon-share clickable"
          ></Button>
          <Button
            variant="white"
            onClick={handleShowForkModal}
            className="flat vizhub-icon icon-fork clickable"
          ></Button>
        </TopbarRight>
      </div>
      <ShareModal show={showShareModal} handleClose={handleCloseShareModal} />
      <ForkModal show={showForkModal} handleClose={handleCloseForkModal} />
      <VerticalSplit>
        {showEditor ? (
          <div className={`editor-sidebar${activeFile ? ' file-is-open' : ''}`}>
            <Nav
              className="flex-column editor-items"
              onSelect={handleSelectFile}
            >
              <Nav.Link eventKey="index.js" className="editor-item clickable">
                index.js
              </Nav.Link>
              <Nav.Link eventKey="styles.css" className="editor-item clickable">
                styles.css
              </Nav.Link>
            </Nav>
          </div>
        ) : null}
        {activeFile ? (
          <EditorContent>
            <Header>
              <HeaderLeft>{activeFile}</HeaderLeft>
              <HeaderRight>
                <Button
                  variant="white"
                  onClick={handleCloseEditorContent}
                  className="flat vizhub-icon icon-x clickable"
                ></Button>
              </HeaderRight>
            </Header>
          </EditorContent>
        ) : null}
        <div
          className={`vertical-split-right${
            showEditor || activeFile ? ' editor-or-file-is-open' : ''
          }`}
        >
          <VizViewer>
            <VizFrame viewBox={`0 0 960 ${height}`} />
            <Title>{title}</Title>
            <MarkdownExample />
            {/* TODO License */}
          </VizViewer>
        </div>
      </VerticalSplit>
    </Wrapper>
  );
};
