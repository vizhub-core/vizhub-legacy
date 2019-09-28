import React from 'react';
import { File } from './File';
import { Directory } from './Directory';
export { getFileTree } from './getFileTree';

export const FileTree = ({
  fileTree,
  activeFile,
  setActiveFile,
  isRenamingActiveFile,
  setIsRenamingActiveFile,
  renameActiveFile,
  indent,
  openDirectories,
  toggleDirectory
}) =>
  fileTree.children ? (
    <>
      <Directory
        indent={indent}
        name={fileTree.name}
        path={fileTree.path}
        toggleDirectory={toggleDirectory}
        isOpen={openDirectories[fileTree.path]}
      />
      {openDirectories[fileTree.path]
        ? fileTree.children.map((child, i) => (
            <FileTree
              key={i}
              fileTree={child}
              activeFile={activeFile}
              setActiveFile={setActiveFile}
              isRenamingActiveFile={isRenamingActiveFile}
              setIsRenamingActiveFile={setIsRenamingActiveFile}
              renameActiveFile={renameActiveFile}
              indent={indent + 1}
              openDirectories={openDirectories}
              toggleDirectory={toggleDirectory}
            />
          ))
        : null}
    </>
  ) : (
    <File
      name={fileTree.name}
      file={fileTree.file}
      activeFile={activeFile}
      setActiveFile={setActiveFile}
      isRenamingActiveFile={isRenamingActiveFile}
      setIsRenamingActiveFile={setIsRenamingActiveFile}
      renameActiveFile={renameActiveFile}
      indent={indent}
    />
  );
