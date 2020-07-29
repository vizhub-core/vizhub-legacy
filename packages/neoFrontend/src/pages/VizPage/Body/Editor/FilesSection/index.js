import React, { useContext, useState } from 'react';
import { getVizFiles } from 'vizhub-presenters';
import { useValue } from '../../../../../useValue';
import { URLStateContext } from '../../../URLStateContext';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { VizContext } from '../../../VizContext';
import { Section } from '../Section';
import { FileTree, getFileTree, sortFileTree } from './FileTree';
import { EditableFileEntry } from './EditableFileEntry';
import { useCreateNewFile } from './useCreateNewFile';
import { useRenameActiveFile } from './useRenameActiveFile';
import { useOpenDirectories } from './useOpenDirectories';

export const FilesSection = ({ isRenamingNewFile, setIsRenamingNewFile }) => {
  const { activeFile, setActiveFile } = useContext(URLStateContext);
  const [isRenamingActiveFile, setIsRenamingActiveFile] = useState(false);

  const { openDirectories, toggleDirectory } = useOpenDirectories(activeFile);

  const { viz$, submitVizContentOp } = useContext(VizContext);
  const files = useValue(viz$, getVizFiles);

  const realtimeModules = useContext(RealtimeModulesContext);

  const renameActiveFile = useRenameActiveFile(
    activeFile,
    setIsRenamingActiveFile,
    files,
    submitVizContentOp,
    realtimeModules
  );

  const createNewFile = useCreateNewFile(
    setIsRenamingNewFile,
    submitVizContentOp,
    setActiveFile,
    files
  );

  const fileTree = files && sortFileTree(getFileTree(files));

  return (
    <Section title="files" id="files" className="test-editor-files-section">
      {fileTree
        ? fileTree.children.map((fileNode, i) => (
            <FileTree
              key={i}
              fileTree={fileNode}
              activeFile={activeFile}
              setActiveFile={setActiveFile}
              isRenamingActiveFile={isRenamingActiveFile}
              setIsRenamingActiveFile={setIsRenamingActiveFile}
              renameActiveFile={renameActiveFile}
              indent={1}
              openDirectories={openDirectories}
              toggleDirectory={toggleDirectory}
            />
          ))
        : null}
      {isRenamingNewFile ? (
        <EditableFileEntry changeFileName={createNewFile} initialFileName="" />
      ) : null}
    </Section>
  );
};
