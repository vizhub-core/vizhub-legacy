import React, { useContext, useState, useCallback } from 'react';
import { getVizFiles, getFileIndex } from '../../../../../accessors';
import { generateFileChangeOp } from '../../../generateFileChangeOp';
import { useValue } from '../../../../../useValue';
import { URLStateContext } from '../../../URLStateContext';
import { RealtimeModulesContext } from '../../../RealtimeModulesContext';
import { VizContext } from '../../../VizContext';
import { Section } from '../Section';
import { FileEntry } from './styles';
import { EditableFileEntry } from './EditableFileEntry';

export const FilesSection = () => {
  const { activeFile, setActiveFile } = useContext(URLStateContext);
  const [isRenamingActiveFile, setIsRenamingActiveFile] = useState(false);

  const { viz$, submitVizContentOp } = useContext(VizContext);
  const files = useValue(viz$, getVizFiles);

  const realtimeModules = useContext(RealtimeModulesContext);

  const renameActiveFile = useCallback(
    newName => {
      const fileIndex = getFileIndex(files, activeFile);
      const op = generateFileChangeOp(
        fileIndex,
        activeFile,
        newName,
        realtimeModules,
        'name'
      );
      if (op.length > 0) {
        submitVizContentOp(op);
      }
      setIsRenamingActiveFile(false);
    },
    [
      activeFile,
      setIsRenamingActiveFile,
      files,
      submitVizContentOp,
      realtimeModules
    ]
  );

  return (
    <Section title="files" id="files" className="test-editor-files-section">
      {files
        ? files.map(file =>
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
                {file.name}
              </FileEntry>
            )
          )
        : null}
    </Section>
  );
};
