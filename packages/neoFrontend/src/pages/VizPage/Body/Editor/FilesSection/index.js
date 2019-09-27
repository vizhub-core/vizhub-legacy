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
import { FileEntry } from './styles';
import { EditableFileEntry } from './EditableFileEntry';
import { getFileTree } from './getFileTree';

export const FilesSection = ({ isRenamingNewFile, setIsRenamingNewFile }) => {
  const { activeFile, setActiveFile } = useContext(URLStateContext);
  const [isRenamingActiveFile, setIsRenamingActiveFile] = useState(false);

  const { viz$, submitVizContentOp } = useContext(VizContext);
  const files = useValue(viz$, getVizFiles);
  const fileTree = getFileTree(files);
  console.log(fileTree);

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

  return (
    <Section title="files" id="files" className="test-editor-files-section">
      {sortedFiles
        ? sortedFiles.map(file =>
            isRenamingActiveFile && file.name === activeFile ? (
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
            )
          )
        : null}
      {isRenamingNewFile ? (
        <EditableFileEntry changeFileName={createNewFile} initialFileName="" />
      ) : null}
    </Section>
  );
};
