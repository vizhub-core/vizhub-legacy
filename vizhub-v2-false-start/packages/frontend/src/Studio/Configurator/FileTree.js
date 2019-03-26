import React from 'react';
import { Item } from './styles';
import { Menu } from './Menu';
export const FileTree = ({
  node: { children, id, name },
  activeFileId,
  selectFile
}) =>
  children ? (
    <Menu key={name} title={name} mono={true}>
      {children.map(child => (
        <FileTree
          key={child.name}
          node={child}
          activeFileId={activeFileId}
          selectFile={selectFile}
        />
      ))}
    </Menu>
  ) : (
    <Item
      key={name}
      onClick={selectFile(id)}
      isActive={id === activeFileId}
      mono={true}
    >
      {name}
    </Item>
  );
