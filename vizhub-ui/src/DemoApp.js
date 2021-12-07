import { useState } from 'react';
import { HomePage } from './HomePage';
import { ProfilePage } from './ProfilePage';
import { VizPage } from './VizPage';
import { Nav } from 'react-bootstrap';

const pages = {
  viz: VizPage,
  home: HomePage,
  profile: ProfilePage,
};

export const DemoApp = () => {
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
