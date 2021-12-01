import { useState, useCallback } from 'react';
import { Container, Button } from 'react-bootstrap';
import { classed } from './classed';
import { Navigation } from './Navigation';
import { ShareModal } from './ShareModal';

const Topbar = classed('topbar');
const VizHubIcon = classed('vizhub-icon');

export const VizPage = () => {
  // Inspired by
  // https://react-bootstrap.github.io/components/modal/#modals-live
  const [show, setShow] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  const handleToggleEditor = useCallback(
    () => setShowEditor(!showEditor),
    [showEditor]
  );

  return (
    <>
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
    </>
  );
};
