import React from 'react';
import { Section } from '../../Section';
import { FileTree } from './FileTree';
import { getFileTree } from './getFileTree';

export const FilesSection = ({ vizData, activeFileId, selectFile }) => {
  const fileTree = getFileTree(vizData);
  return (
    <Section title="Files" id="files">
      {fileTree.children.map(child => (
        <FileTree
          key={child.name}
          node={child}
          activeFileId={activeFileId}
          selectFile={selectFile}
        />
      ))}
    </Section>
  );
};
