import React from 'react';
import { File } from './styles';
import { Menu } from './Menu';
export const FileTree = ({
  node: { children, id, name },
  activeFileId,
  selectFile
}) =>
  children ? (
    <Menu key={name} title={name}>
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
    <File key={name} onClick={selectFile(id)} isActive={id === activeFileId}>
      {name}
    </File>
  );
