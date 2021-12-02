import { classed } from './classed';
import { Nav } from 'react-bootstrap';

const Wrapper = classed('editor-sidebar');
const Items = classed('editor-items');
const Item = classed('editor-item clickable');

export const EditorSidebar = () => {
  return (
    <Wrapper>
      <Nav defaultActiveKey="link-1" className="flex-column editor-items">
        <Nav.Link eventKey="link-1" className="editor-item clickable">
          Link
        </Nav.Link>
        <Nav.Link eventKey="link-2" className="editor-item clickable">
          Link 2
        </Nav.Link>
      </Nav>
    </Wrapper>
    //    <Wrapper>
    //      <Items role="listbox">
    //        <Item role="option" tabindex="0">index.js</Item>
    //        <Item role="option" tabindex="0">styles.css</Item>
    //      </Items>
    //    </Wrapper>
  );
};
