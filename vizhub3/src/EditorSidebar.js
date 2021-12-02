import { classed } from './classed';

const Wrapper = classed('editor-sidebar');
const Items = classed('editor-items', 'ul');
const Item = classed('editor-item clickable', 'li');

export const EditorSidebar = () => {
  return (
    <Wrapper>
      <Items role="listbox">
        <Item role="option">index.js</Item>
        <Item role="option">styles.css</Item>
      </Items>
    </Wrapper>
  );
};
