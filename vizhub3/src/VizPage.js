import { useState, useCallback } from 'react';
import { Container, Button } from 'react-bootstrap';
import { classed } from './classed';
import { Navigation } from './Navigation';
import { ShareModal } from './ShareModal';
import { MarkdownExample } from './MarkdownExample';

const Wrapper = classed('viz-page');
const Topbar = classed('topbar');
const Icon = classed('vizhub-icon');
const VizViewer = classed('viz-viewer');
const VizFrame = classed('viz-frame', 'svg');
const Title = classed('title', 'h4');
const VerticalSplit = classed('vertical-split');
const VerticalSplitLeft = classed('vertical-split-left');
const VerticalSplitRight = ({ showEditor, children }) => (
  <div className={`vertical-split-right${showEditor ? ' editor-is-open' : ''}`}>
    {children}
  </div>
);
const EditorSidebar = classed('editor-sidebar');
//const Readme = classed('readme', 'article');

export const VizPage = () => {
  // Inspired by
  // https://react-bootstrap.github.io/components/modal/#modals-live
  const [show, setShow] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);
  const title = 'Test Title';
  const height = 500;

  const handleToggleEditor = useCallback(
    () => setShowEditor(!showEditor),
    [showEditor]
  );

  return (
    <Wrapper>
      <Navigation />
      <Topbar>
        <Button
          variant="white"
          onClick={handleToggleEditor}
          className={`editor-toggle flat d-flex align-items-center`}
        >
          <div
            className={`vizhub-icon icon-chevron ${
              showEditor ? 'right' : 'left'
            }`}
          />
          {showEditor ? 'Close' : 'Open'} Editor
        </Button>
        <Button
          variant="white"
          onClick={handleShow}
          className="flat vizhub-icon icon-share"
        ></Button>
      </Topbar>
      <ShareModal show={show} handleClose={handleClose} />
      <VerticalSplit>
        {showEditor ? <EditorSidebar /> : null}
        <VerticalSplitRight showEditor={showEditor}>
          <VizViewer>
            <VizFrame viewBox={`0 0 960 ${height}`} />
            <Title>{title}</Title>
            <MarkdownExample />
            {/* TODO License */}
          </VizViewer>
        </VerticalSplitRight>
      </VerticalSplit>
    </Wrapper>
  );
};
