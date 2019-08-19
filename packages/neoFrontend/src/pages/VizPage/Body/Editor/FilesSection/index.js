import React, { useContext, useState } from 'react';
import { getVizFiles } from '../../../../../accessors';
import { useValue } from '../../../../../useValue';
import { URLStateContext } from '../../../URLStateContext';
import { VizContext } from '../../../VizContext';
import { Section } from '../Section';
import { FileEntry, EditableFileEntry } from './styles';

export const FilesSection = () => {
  const { activeFile, setActiveFile } = useContext(URLStateContext);

  // editableFile stores the original name, not the changed name.
  const [editableFile, setEditableFile] = useState(null);

  // editableFileNewName stores the new name, as it's being typed.
  const [editableFileNewName, setEditableFileNewName] = useState(null);

  const { viz$ } = useContext(VizContext);
  const files = useValue(viz$, getVizFiles);

  const onEditableFileChange = event => {
    setEditableFileNewName(event.target.value);
  };

  return (
    <Section title="files" id="files" className="test-editor-files-section">
      {files
        ? files.map(file =>
            file.name === editableFile ? (
              <EditableFileEntry
                key={file.name}
                type="text"
                value={editableFileNewName}
                onChange={onEditableFileChange}
              />
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
