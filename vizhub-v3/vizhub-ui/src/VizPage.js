import { useState, useCallback } from 'react';
import { Container, Button, Nav } from 'react-bootstrap';
import { classed } from './classed';
import { Navigation } from './Navigation';
import { ShareModal } from './ShareModal';
import { ForkModal } from './ForkModal';
import { MarkdownExample } from './MarkdownExample';

const Wrapper = classed('viz-page');
const TopbarPart = classed('topbar-part');
const Icon = classed('vizhub-icon');
const VizViewer = classed('viz-viewer');
const VizFrame = classed('viz-frame', 'svg');
const Title = classed('title', 'h4');
const Split = classed('viz-page-split');
const EditorContent = classed('editor-content');
const Header = classed('editor-content-header');
const HeaderLeft = classed('editor-content-header-left');
const HeaderRight = classed('header-right');

export const VizPage = () => {
  // Inspired by
  // https://react-bootstrap.github.io/components/modal/#modals-live
  const [showShareModal, setShowShareModal] = useState(false);
  const [showForkModal, setShowForkModal] = useState(false);

  // TODO move this up and out to URL state.
  const [showEditor, setShowEditor] = useState(false);

  // TODO move this up and out to URL state.
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

  // TODO more this up and out
  const title = 'Test Title';
  const height = 500;

  const handleToggleEditor = useCallback(
    () => setShowEditor(!showEditor),
    [showEditor]
  );

  return (
    <Wrapper>
      <Navigation className={activeFile ? 'hide-on-mobile' : ''} />
      <div className={`topbar${activeFile ? ' hide-on-mobile' : ''}`}>
        <TopbarPart>
          <Button
            variant="white"
            onClick={handleToggleEditor}
            className={`topbar-editor-toggle btn-flat btn-flat-light clickable`}
          >
            <div
              className={`vizhub-icon icon-chevron ${
                showEditor ? 'right' : 'left'
              }`}
            />
            {showEditor ? 'Close' : 'Open'} Editor
          </Button>
        </TopbarPart>
        <TopbarPart>
          <Button
            variant="white"
            onClick={handleShowShareModal}
            className="vizhub-icon icon-share btn-flat btn-flat-light clickable"
          ></Button>
          <Button
            variant="white"
            onClick={handleShowForkModal}
            className="vizhub-icon icon-fork btn-flat btn-flat-light clickable"
          ></Button>
        </TopbarPart>
      </div>
      <ShareModal show={showShareModal} handleClose={handleCloseShareModal} />
      <ForkModal show={showForkModal} handleClose={handleCloseForkModal} />
      <Split>
        {showEditor ? (
          <div
            className={`editor-sidebar${activeFile ? ' hide-on-mobile' : ''}`}
          >
            <Nav
              className="flex-column editor-sidebar-items"
              onSelect={handleSelectFile}
            >
              <Nav.Link
                eventKey="index.js"
                className="editor-sidebar-item clickable btn-flat-dark"
              >
                index.js
              </Nav.Link>
              <Nav.Link
                eventKey="styles.css"
                className="editor-sidebar-item clickable btn-flat-dark"
              >
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
                  className="vizhub-icon icon-expand btn-flat btn-flat-dark clickable"
                ></Button>
                <Button
                  variant="white"
                  onClick={handleCloseEditorContent}
                  className="vizhub-icon icon-x btn-flat btn-flat-dark clickable"
                ></Button>
              </HeaderRight>
            </Header>
          </EditorContent>
        ) : null}
        <div
          className={`vertical-split-right${
            showEditor || activeFile ? ' hide-on-mobile' : ''
          }`}
        >
          <VizViewer>
            <VizFrame viewBox={`0 0 960 ${height}`} />
            <Title>{title}</Title>
            <MarkdownExample />
            {/* TODO License */}
          </VizViewer>
        </div>
      </Split>
    </Wrapper>
  );
};
