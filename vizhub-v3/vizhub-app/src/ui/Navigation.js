import React from 'react';
import {
  Nav,
  Navbar,
  Container,
  Modal,
  Button,
  InputGroup,
  FormControl,
} from './Bootstrap';

export const Navigation = ({ className, renderLogInWigdet }) => (
  <Navbar bg="dark" variant="dark" expand="md" className={className}>
    <Container fluid>
      <Navbar.Brand href="/"></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" />
        <Nav className="align-items-md-center">
          <Nav.Link href="/forum">Forum</Nav.Link>
          {renderLogInWigdet()}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
