import React from 'react';
import { Wrapper, FileEntry } from './styles';
import { Section } from './Section';

export const Editor = ({ files }) => (
  <Wrapper>
    <Section title="visual editor" id="visual" />
    <Section title="files" id="files">
      {files.map(file => (
        <FileEntry key={file.name}>{file.name}</FileEntry>
      ))}
    </Section>
  </Wrapper>
);
