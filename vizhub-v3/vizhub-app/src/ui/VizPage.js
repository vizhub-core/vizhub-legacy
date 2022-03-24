import React, { useState, useCallback } from 'react';
import { Container, Button, Nav } from './Bootstrap';
import { Navigation } from './Navigation';
import { ShareModal } from './ShareModal';
import { ForkModal } from './ForkModal';

export const VizPage = ({
  markdownBody = () => '',
  title,
  sortedFileMetadata,
  getFileName,
  renderCodeEditor,
  renderLogInWigdet,
}) => {
  // This is invoked as a React component.
  const MarkdownBody = markdownBody;

  // Inspired by
  // https://react-bootstrap.github.io/components/modal/#modals-live
  const [showShareModal, setShowShareModal] = useState(false);
  const [showForkModal, setShowForkModal] = useState(false);

  // TODO move this up and out to URL state.
  const [showEditor, setShowEditor] = useState(false);

  // TODO move this up and out to URL state.
  const [activeFileId, setActiveFileId] = useState(null);

  // Clicking on the already open item will close it.
  const handleSelectFile = useCallback(
    (eventKey) => {
      setActiveFileId(activeFileId === eventKey ? null : eventKey);
    },
    [activeFileId]
  );

  const handleCloseEditorContent = useCallback(() => {
    setActiveFileId(null);
  }, []);

  const handleCloseShareModal = useCallback(() => setShowShareModal(false), []);
  const handleShowShareModal = useCallback(() => setShowShareModal(true), []);
  const handleCloseForkModal = useCallback(() => setShowForkModal(false), []);
  const handleShowForkModal = useCallback(() => setShowForkModal(true), []);

  // TODO more this up and out
  const height = 500;

  const handleToggleEditor = useCallback(
    () => setShowEditor(!showEditor),
    [showEditor]
  );

  return (
    <div className="viz-page">
      <Navigation
        className={activeFileId ? 'hide-on-mobile' : ''}
        renderLogInWigdet={renderLogInWigdet}
      />
      <div className={`topbar${activeFileId ? ' hide-on-mobile' : ''}`}>
        <div className="topbar-part">
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
        </div>
        <div className="topbar-part">
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
        </div>
      </div>
      <ShareModal show={showShareModal} handleClose={handleCloseShareModal} />
      <ForkModal show={showForkModal} handleClose={handleCloseForkModal} />
      <div className="viz-page-split">
        {showEditor ? (
          <div
            className={`editor-sidebar${activeFileId ? ' hide-on-mobile' : ''}`}
          >
            <Nav
              className="flex-column editor-sidebar-items"
              onSelect={handleSelectFile}
            >
              {sortedFileMetadata.map(({ name, vizFileId }) => (
                <Nav.Link
                  eventKey={vizFileId}
                  className="editor-sidebar-item clickable btn-flat-dark"
                >
                  {name}
                </Nav.Link>
              ))}
            </Nav>
          </div>
        ) : null}
        {activeFileId ? (
          <div className="editor-content">
            <div className="editor-content-header">
              <div className="editor-content-header-left">
                {getFileName(activeFileId)}
              </div>
              <div className="header-right">
                <Button
                  variant="white"
                  className="vizhub-icon icon-expand btn-flat btn-flat-dark clickable"
                ></Button>
                <Button
                  variant="white"
                  onClick={handleCloseEditorContent}
                  className="vizhub-icon icon-x btn-flat btn-flat-dark clickable"
                ></Button>
              </div>
            </div>
            {renderCodeEditor(activeFileId)}
          </div>
        ) : null}
        <div
          className={`vertical-split-right${
            showEditor || activeFileId ? ' hide-on-mobile' : ''
          }`}
        >
          <div className="viz-viewer">
            <svg className="viz-frame" viewBox={`0 0 960 ${height}`} />
            <h4 className="title">{title}</h4>
            <MarkdownBody />
          </div>
        </div>
      </div>
    </div>
  );
};
