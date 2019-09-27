import React from 'react';
import { File } from './File';
import { Directory } from './Directory';

export const FileTree = ({
  fileTree,
  activeFile,
  setActiveFile,
  isRenamingActiveFile,
  setIsRenamingActiveFile,
  renameActiveFile,
  indent = 0
}) =>
  fileTree.children ? (
    <>
      <Directory indent={indent} name={fileTree.name} />
      {fileTree.children.map(child => (
        <FileTree
          fileTree={child}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          isRenamingActiveFile={isRenamingActiveFile}
          setIsRenamingActiveFile={setIsRenamingActiveFile}
          renameActiveFile={renameActiveFile}
          indent={indent + 1}
        />
      ))}
    </>
  ) : (
    <File
      file={fileTree.file}
      activeFile={activeFile}
      setActiveFile={setActiveFile}
      isRenamingActiveFile={isRenamingActiveFile}
      setIsRenamingActiveFile={setIsRenamingActiveFile}
      renameActiveFile={renameActiveFile}
      indent={indent}
    />
  );
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
