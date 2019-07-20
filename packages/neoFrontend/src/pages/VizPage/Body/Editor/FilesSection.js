import React, { useContext } from 'react';
import { URLStateContext } from '../../URLStateContext';
import { VizPageDataContext } from '../../VizPageDataContext';
import { Section } from './Section';
import { FileEntry } from './styles';

export const FilesSection = () => {
  const { activeFile, setActiveFile } = useContext(URLStateContext);

  const { visualization } = useContext(VizPageDataContext);
  const { files } = visualization.content;

  return (
    <Section title="files" id="files">
      {files.map(file => (
        <FileEntry
          key={file.name}
          isActive={file.name === activeFile}
          onClick={() => {
            setActiveFile(file.name);
          }}
        >
          {file.name}
        </FileEntry>
      ))}
    </Section>
  );
};
