import { useState, useCallback } from 'react';
import {
  Nav,
  Navbar,
  Dropdown,
  Image,
  Container,
  Modal,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

const ShareModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Share</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div className="vizhub-form-note contextual">SHARE WITH</div>
      <Nav variant="pills" defaultActiveKey="link">
        <Nav.Item>
          <Nav.Link eventKey="link">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="embed">Embed</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="snippet">Snippet</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="collaborators">Collaborators</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="vizhub-form-note informational">
        Sharing this link on social media will automatically create a preview.
      </div>
      <InputGroup className="mb-3">
        <FormControl
          aria-label="Link URL"
          aria-describedby="button-copy"
          defaultValue="https://vizhub.com/curran/2ee9f785faee42e6b697c527cd196025"
          readOnly
        />
        <Button variant="outline-primary" id="button-copy">
          Copy
        </Button>
      </InputGroup>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose}>
        Done
      </Button>
    </Modal.Footer>
  </Modal>
);

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
