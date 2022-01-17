import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HomePage, ProfilePage, VizPage } from 'vizhub-ui';
import { Nav } from 'react-bootstrap';
import { MarkdownExample } from './MarkdownExample';

const pages = {
  viz: VizPage({ MarkdownBody: MarkdownExample }),
  home: HomePage,
  profile: ProfilePage,
};

const DemoApp = () => {
  const [page, setPage] = useState('viz');

  const Page = pages[page];

  return (
    <>
      <Nav variant="pills" defaultActiveKey={page} onSelect={setPage}>
        <Nav.Item>
          <Nav.Link eventKey="viz">Viz</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="profile">Profile</Nav.Link>
        </Nav.Item>
      </Nav>
      <Page />
    </>
  );
};

ReactDOM.render(<DemoApp />, document.getElementById('root'));
