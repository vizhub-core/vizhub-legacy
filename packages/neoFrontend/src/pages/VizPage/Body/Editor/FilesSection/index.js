import React, { useContext } from 'react';
import { URLStateContext } from '../../../URLStateContext';
import { VizPageDataContext } from '../../../VizPageDataContext';
import { Section } from '../Section';
import { VerticallyCenteredMonoText } from '../styles';
import { FileEntry } from './styles';

export const FilesSection = () => {
  const { activeFile, setActiveFile } = useContext(URLStateContext);

  const { visualization } = useContext(VizPageDataContext);
  const { files } = visualization.content;

  return (
    <Section title="files" id="files" className="test-editor-files-section">
      {files.map(file => (
        <FileEntry
          key={file.name}
          isActive={file.name === activeFile}
          onClick={() => {
            setActiveFile(file.name);
          }}
          className={
            file.name === 'index.html'
              ? 'test-editor-file-entry-index-html'
              : ''
          }
        >
          <VerticallyCenteredMonoText>{file.name}</VerticallyCenteredMonoText>
        </FileEntry>
      ))}
    </Section>
  );
};
