import React from 'react';
import { renameFileWithoutPath } from '../../../../../../featureFlags';
import { EditableFileEntry } from '../EditableFileEntry';
import { FileEntry } from './styles';
import { addPath } from './addPath';

export const File = ({
  name,
  file,
  activeFile,
  setActiveFile,
  isRenamingActiveFile,
  setIsRenamingActiveFile,
  renameActiveFile,
  indent,
}) =>
  isRenamingActiveFile && file.name === activeFile ? (
    <EditableFileEntry
      changeFileName={(newName) =>
        renameActiveFile(
          renameFileWithoutPath ? addPath(newName, file.name) : newName
        )
      }
      initialFileName={renameFileWithoutPath ? name : file.name}
      indent={renameFileWithoutPath ? indent : 0}
    />
  ) : (
    <FileEntry
      isActive={file.name === activeFile}
      onClick={() => {
        setActiveFile(file.name);

        // Don't allow users to rename bundle.js
        if (activeFile === 'bundle.js') return;

        setIsRenamingActiveFile(activeFile === file.name);
      }}
      className={
        file.name === 'index.html' ? 'test-editor-file-entry-index-html' : ''
      }
      indent={indent}
    >
      <div style={{ opacity: file.name === 'bundle.js' ? 0.6 : 1 }}>{name}</div>
    </FileEntry>
  );
