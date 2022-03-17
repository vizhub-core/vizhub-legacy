import React, { forwardRef } from 'react';
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
} from './Bootstrap';

// Inspired by:
// https://react-bootstrap.netlify.app/components/dropdowns/#custom-dropdown-components
const AvatarToggle = forwardRef(({ children, onClick }, ref) => (
  <button
    type="button"
    className="navbar__avatar-toggle dropdown-toggle"
    ref={ref}
    onClick={onClick}
  >
    {children}
  </button>
));

export const Navigation = ({ className }) => (
  <Navbar bg="dark" variant="dark" expand="md" className={className}>
    <Container fluid>
      <Navbar.Brand href="/"></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" />
        <Nav className="align-items-md-center">
          <Nav.Link href="/forum">Forum</Nav.Link>

          <Dropdown align="end">
            <Dropdown.Toggle as={AvatarToggle}>
              <Image
                src="https://github.com/mdo.png"
                roundedCircle
                width="32"
                height="32"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#create-viz">Create Viz</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#create-viz">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#create-viz">Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
