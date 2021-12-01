import { useState } from 'react';
import { HomePage } from './HomePage';
import { VizPage } from './VizPage';
import { Nav } from 'react-bootstrap';

const pages = {
  home: () => <HomePage />,
  viz: () => <VizPage />,
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
          <Nav.Link eventKey="viz">Viz</Nav.Link>
        </Nav.Item>
      </Nav>
      <Page />
    </>
  );
};
