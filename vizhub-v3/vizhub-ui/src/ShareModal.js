import React, { useState } from 'react';
import {
  Container,
  Button,
  Modal,
  Nav,
  InputGroup,
  FormControl,
  Form,
} from 'react-bootstrap';

const LinkSection = () => (
  <>
    <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
      <InputGroup>
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
      <Form.Text className="text-muted">
        Sharing this link on social media will automatically create a preview.
      </Form.Text>
    </Form.Group>
  </>
);

const sections = {
  link: LinkSection,
  embed: () => null,
  snippet: () => null,
};

export const ShareModal = ({ show, handleClose }) => {
  const [section, setSection] = useState('link');
  const Section = sections[section];

  return show ? (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Share</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="vizhub-form-note contextual">SHARE WITH</div>
        <Nav variant="pills" defaultActiveKey={section} onSelect={setSection}>
          <Nav.Item>
            <Nav.Link eventKey="link">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="embed">Embed</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="snippet">Snippet</Nav.Link>
          </Nav.Item>
        </Nav>
        <Section />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};
