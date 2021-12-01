import { useState, useCallback } from 'react';
import { Container, Button } from 'react-bootstrap';
import { classed } from './classed';
import { Navigation } from './Navigation';
import { ShareModal } from './ShareModal';

const Topbar = classed('topbar');

export const VizPage = () => {
  // Inspired by
  // https://react-bootstrap.github.io/components/modal/#modals-live
  const [show, setShow] = useState(false);
  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  return (
    <>
      <Navigation />
      <Topbar>
        <Button variant="white" onClick={handleShow} className="flat">
          Open Editor
        </Button>
        <Button
          variant="white"
          onClick={handleShow}
          className="flat vizhub-icon-share"
        ></Button>
      </Topbar>
      <ShareModal show={show} handleClose={handleClose} />
    </>
  );
};
