import { classed } from './classed';
import { useState } from 'react';
import { Nav } from 'react-bootstrap';

const Wrapper = classed('editor-sidebar');
const Items = classed('editor-items');
const Item = classed('editor-item clickable');

export const EditorSidebar = () => {
  const [activeItem, setActiveItem] = useState('index.js');
  console.log(activeItem);
  return (
    <Wrapper>
      <Nav
        defaultActiveKey={activeItem}
        className="flex-column editor-items"
        onSelect={setActiveItem}
      >
        <Nav.Link eventKey="index.js" className="editor-item clickable">
          index.js
        </Nav.Link>
        <Nav.Link eventKey="styles.css" className="editor-item clickable">
          styles.css
        </Nav.Link>
      </Nav>
    </Wrapper>
  );
};
