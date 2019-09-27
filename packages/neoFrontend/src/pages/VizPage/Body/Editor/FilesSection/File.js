import React from 'react';
import { FileEntry } from './styles';
import { EditableFileEntry } from './EditableFileEntry';

export const File = ({
  name,
  file,
  activeFile,
  setActiveFile,
  isRenamingActiveFile,
  setIsRenamingActiveFile,
  renameActiveFile,
  indent
}) =>
  isRenamingActiveFile && file.name === activeFile ? (
    <EditableFileEntry
      changeFileName={renameActiveFile}
      initialFileName={activeFile}
      indent={indent}
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
