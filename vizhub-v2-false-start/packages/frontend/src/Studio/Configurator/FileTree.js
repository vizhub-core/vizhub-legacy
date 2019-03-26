import React from 'react';
import { File } from './styles';
import { Menu } from './Menu';
export const FileTree = ({ node, activeFileId, selectFile }) =>
  node.children.map(({ children, id, name }) =>
    children ? (
      <Menu key={name} title={name} options={[]} />
    ) : (
      <File key={name} onClick={selectFile(id)} isActive={id === activeFileId}>
        {name}
      </File>
    )
  );
