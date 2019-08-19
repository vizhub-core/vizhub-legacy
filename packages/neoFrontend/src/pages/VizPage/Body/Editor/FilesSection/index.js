import React, { useContext, useState, useCallback } from 'react';
import { getVizFiles, getFileIndex } from '../../../../../accessors';
import { generateFileChangeOp } from '../../../generateFileChangeOp';
import { useValue } from '../../../../../useValue';
import { URLStateContext } from '../../../URLStateContext';
import { RealtimeModulesContext } from '../../../RealtimeModulesContext';
import { VizContext } from '../../../VizContext';
import { Section } from '../Section';
import { FileEntry, EditableFileEntry, EditableFileInput } from './styles';

export const FilesSection = () => {
  const { activeFile, setActiveFile } = useContext(URLStateContext);

  // editableFile stores the original name, not the changed name.
  const [editableFile, setEditableFile] = useState(null);

  // editableFileNewName stores the new name, as it's being typed.
  const [editableFileNewName, setEditableFileNewName] = useState(null);

  const { viz$, submitVizContentOp } = useContext(VizContext);
  const files = useValue(viz$, getVizFiles);

  const realtimeModules = useContext(RealtimeModulesContext);

  const onEditableFileChange = useCallback(
    event => {
      setEditableFileNewName(event.target.value);
    },
    [setEditableFileNewName]
  );

  const changeFileName = useCallback(
    newName => {
      setEditableFile(null);
      const fileIndex = getFileIndex(files, editableFile);
      const op = generateFileChangeOp(
        fileIndex,
        editableFile,
        newName,
        realtimeModules,
        'name'
      );
      if (op.length > 0) {
        submitVizContentOp(op);
      }
    },
    [editableFile, setEditableFile, files, submitVizContentOp, realtimeModules]
  );

  const onEditableFileBlur = useCallback(
    event => {
      changeFileName(event.target.value);
    },
    [changeFileName]
  );

  const onEditableFileKeyDown = useCallback(
    event => {
      if (event.key === 'Enter') {
        changeFileName(event.target.value);
      }
    },
    [changeFileName]
  );

  return (
    <Section title="files" id="files" className="test-editor-files-section">
      {files
        ? files.map(file =>
            file.name === editableFile ? (
              <EditableFileEntry>
                <EditableFileInput
                  key={file.name}
                  type="text"
                  value={editableFileNewName}
                  onChange={onEditableFileChange}
                  onBlur={onEditableFileBlur}
                  onKeyDown={onEditableFileKeyDown}
                />
              </EditableFileEntry>
            ) : (
              <FileEntry
                key={file.name}
                isActive={file.name === activeFile}
                onClick={() => {
                  if (activeFile === file.name) {
                    setEditableFileNewName(file.name);
                    setEditableFile(file.name);
                  } else {
                    setEditableFile(null);
                    setActiveFile(file.name);
                  }
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
