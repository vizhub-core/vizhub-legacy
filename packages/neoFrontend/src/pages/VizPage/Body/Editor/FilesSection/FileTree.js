import React from 'react';
//import { Item } from '../../styles';
//import { Menu } from '../../Menu';
import { FileEntry } from './styles';
import { EditableFileEntry } from './EditableFileEntry';

export const FileTree = ({
  fileTree,
  activeFile,
  setActiveFile,
  isRenamingActiveFile,
  setIsRenamingActiveFile,
  renameActiveFile
}) =>
  fileTree.children.map(node => {
    if (node.file) {
      const file = node.file;
      return isRenamingActiveFile && file.name === activeFile ? (
        <EditableFileEntry
          key={file.name}
          changeFileName={renameActiveFile}
          initialFileName={activeFile}
        />
      ) : (
        <FileEntry
          key={file.name}
          isActive={file.name === activeFile}
          onClick={() => {
            setActiveFile(file.name);

            // Don't allow users to rename bundle.js
            if (activeFile === 'bundle.js') return;

            setIsRenamingActiveFile(activeFile === file.name);
          }}
          className={
            file.name === 'index.html'
              ? 'test-editor-file-entry-index-html'
              : ''
          }
        >
          <div style={{ opacity: file.name === 'bundle.js' ? 0.6 : 1 }}>
            {file.name}
          </div>
        </FileEntry>
      );
    } else {
      return null;
    }
  });
//export const FileTree = ({
//  node: { children, id, name },
//  activeFileId,
//  selectFile
//}) =>
//  children ? (
//    <Menu key={name} title={name} mono={true}>
//      {children.map(child => (
//        <FileTree
//          key={child.name}
//          node={child}
//          activeFileId={activeFileId}
//          selectFile={selectFile}
//        />
//      ))}
//    </Menu>
//  ) : (
//    <Item
//      key={name}
//      onClick={selectFile(id)}
//      isActive={id === activeFileId}
//      mono={true}
//    >
//      {name}
//    </Item>
//  );
