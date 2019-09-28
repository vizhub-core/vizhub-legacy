import React, { useContext, useState, useCallback } from 'react';
import { getVizFiles } from '../../../../../accessors';
import { useValue } from '../../../../../useValue';
import { URLStateContext } from '../../../URLStateContext';
import { RealtimeModulesContext } from '../../../RealtimeModulesContext';
import { VizContext } from '../../../VizContext';
import { Section } from '../Section';
import { FileTree } from './FileTree';
import { EditableFileEntry } from './EditableFileEntry';
import { getFileTree } from './getFileTree';
import { useCreateNewFile } from './useCreateNewFile';
import { useRenameActiveFile } from './useRenameActiveFile';
import { initialOpenDirectories } from './initialOpenDirectories';

export const FilesSection = ({ isRenamingNewFile, setIsRenamingNewFile }) => {
  const { activeFile, setActiveFile } = useContext(URLStateContext);
  const [isRenamingActiveFile, setIsRenamingActiveFile] = useState(false);
  const [openDirectories, setOpenDirectories] = useState(
    initialOpenDirectories(activeFile)
  );

  console.log(activeFile);

  const toggleDirectory = useCallback(
    directory => {
      setOpenDirectories(
        Object.assign({}, openDirectories, {
          [directory]: !openDirectories[directory]
        })
      );
    },
    [openDirectories, setOpenDirectories]
  );
  console.log(openDirectories);

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
    files
  );

  const sortedFiles =
    files && files.slice().sort((a, b) => a.name.localeCompare(b.name));

  // TODO sort that shit recursively
  //  - directories come before files, like NERDTree
  // TODO memoize
  const fileTree = sortedFiles && getFileTree(sortedFiles);

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
