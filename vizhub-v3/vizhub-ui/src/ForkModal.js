import React, { useState } from 'react';
import {
  Container,
  Button,
  Modal,
  Nav,
  InputGroup,
  FormControl,
  Form,
} from './Bootstrap';

export const ForkModal = ({ show, handleClose }) => {
  return show ? (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Fork</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" />
          <Form.Text className="text-muted">
            Choose a name for your new viz.
          </Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Fork
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};
