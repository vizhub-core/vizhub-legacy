import { useState } from 'react';
import {
  Nav,
  Navbar,
  Dropdown,
  NavDropdown,
  Image,
  Container,
  Modal,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

// Inspired by:
// https://react-bootstrap.netlify.app/components/dropdowns/#custom-dropdown-components
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    type="button"
    className="vizhub-navbar-avatar-toggle dropdown-toggle"
    ref={ref}
    onClick={onClick}
  >
    {children}
  </button>
));

const pages = {
  home: () => (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" />
          <Nav className="align-items-md-center">
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#forum">Forum</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>

            <Dropdown align="end">
              <Dropdown.Toggle as={CustomToggle}>
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
            {/*
            <NavDropdown title="Me" id="basic-nav-dropdown" align="end">
              <NavDropdown.Item href="#create-viz">Create Viz</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#create-viz">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#create-viz">Sign Out</NavDropdown.Item>
            </NavDropdown>
*/}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ),
  share: () => (
    <Container>
      <Modal.Dialog>
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
            Sharing this link on social media will automatically create a
            preview.
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
          {/*
          <div className="input-group mb-3">
            <input type="text" className="form-control" aria-label="Link URL" aria-describedby="button-addon-copy" >
            <button className="btn btn-outline-primary" type="button" id="button-addon-copy">Copy</button>
          </div>
*/}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Done</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Container>
  ),
};

export const DemoApp = () => {
  const [page, setPage] = useState('home');

  const Page = pages[page];

  return (
    <>
      <Nav variant="pills" defaultActiveKey={page} onSelect={setPage}>
        <Nav.Item>
          <Nav.Link eventKey="home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="share">Share</Nav.Link>
        </Nav.Item>
      </Nav>
      <Page />
    </>
  );
};
