import React, { useContext } from 'react';
import { URLStateContext } from '../../URLStateContext';
import { Wrapper, FileEntry } from './styles';
import { Section } from './Section';

export const Editor = ({ files }) => {
  const { activeFile, setActiveFile } = useContext(URLStateContext);
  return (
    <Wrapper>
      <Section title="visual editor" id="visual" />
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
    </Wrapper>
  );
};
