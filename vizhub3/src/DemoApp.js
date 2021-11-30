import { useCallback, useState } from 'react';
import { Nav } from 'react-bootstrap';

export const DemoApp = () => {
  const [page, setPage] = useState('home');
console.log(page);
  return (
    <Nav variant="pills" defaultActiveKey={page}  onSelect={setPage}>
      <Nav.Item>
        <Nav.Link eventKey="home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="share">Share</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
