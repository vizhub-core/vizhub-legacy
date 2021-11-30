import { useCallback, useState } from 'react';
import { Nav, Container, Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

const pages = {
  home: () => (
    <nav className="navbar navbar-dark bg-black">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"></a>
      </div>
    </nav>
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
              <Nav.Link eventKey="snippet">Collaborators</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="vizhub-form-note informational">Sharing this link on social media will automatically create a preview.</div>
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
  )
};

export const DemoApp = () => {
  const [page, setPage] = useState('home');

  const Page = pages[page];

  return <>
    <Nav variant="pills" defaultActiveKey={page}  onSelect={setPage}>
      <Nav.Item>
        <Nav.Link eventKey="home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="share">Share</Nav.Link>
      </Nav.Item>
    </Nav>
    <Page />
  </>;
}
