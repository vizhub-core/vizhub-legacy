import { useState, useCallback } from 'react';
import { Container, Button } from 'react-bootstrap';

import { ShareModal } from './ShareModal';

export const VizPage = () => {
  // Inspired by
  // https://react-bootstrap.github.io/components/modal/#modals-live
  const [show, setShow] = useState(false);
  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Share
      </Button>
      <ShareModal show={show} handleClose={handleClose} />
    </Container>
  );
};
