import React, { useContext, useState, useCallback } from 'react';
import {
  getVizFiles,
  getFileIndex,
  fileChangeOp,
  fileCreateOp
} from '../../../../../accessors';
import { useValue } from '../../../../../useValue';
import { URLStateContext } from '../../../URLStateContext';
import { RealtimeModulesContext } from '../../../RealtimeModulesContext';
import { VizContext } from '../../../VizContext';
import { Section } from '../Section';
import { FileTree } from './FileTree';
import { EditableFileEntry } from './EditableFileEntry';
import { getFileTree } from './getFileTree';

export const FilesSection = ({ isRenamingNewFile, setIsRenamingNewFile }) => {
  const { activeFile, setActiveFile } = useContext(URLStateContext);
  const [isRenamingActiveFile, setIsRenamingActiveFile] = useState(false);

  const { viz$, submitVizContentOp } = useContext(VizContext);
  const files = useValue(viz$, getVizFiles);

  const realtimeModules = useContext(RealtimeModulesContext);

  const renameActiveFile = useCallback(
    newName => {
      setIsRenamingActiveFile(false);
      const fileIndex = getFileIndex(files, activeFile);
      const op = fileChangeOp(
        fileIndex,
        activeFile,
        newName,
        realtimeModules,
        'name'
      );
      if (op.length > 0) {
        submitVizContentOp(op);
      }
    },
    [
      activeFile,
      setIsRenamingActiveFile,
      files,
      submitVizContentOp,
      realtimeModules
    ]
  );

  const createNewFile = useCallback(
    newName => {
      setIsRenamingNewFile(false);
      if (newName !== '') {
        submitVizContentOp(
          fileCreateOp(files, {
            name: newName,
            text: ''
          })
        );
      }
    },
    [setIsRenamingNewFile, submitVizContentOp, files]
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
            />
          ))
        : null}
      {isRenamingNewFile ? (
        <EditableFileEntry changeFileName={createNewFile} initialFileName="" />
      ) : null}
    </Section>
  );
};
