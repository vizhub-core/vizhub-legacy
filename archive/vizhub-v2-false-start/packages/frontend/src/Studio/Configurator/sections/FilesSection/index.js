import React, { useContext } from 'react';
import { VizContext, URLStateContext } from '../../../../contexts';
import { Section } from '../../Section';
import { FileTree } from './FileTree';
import { getFileTree } from './getFileTree';

export const FilesSection = () => {
  const { vizData } = useContext(VizContext);
  const { activeFileId, selectFile } = useContext(URLStateContext);

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
