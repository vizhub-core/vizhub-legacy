import React from 'react';
import { Wrapper, Sidebar } from './styles';
import { Section } from './Section';
import { FilesSection } from './FilesSection';
import { CodeEditor } from './CodeEditor';

export const Editor = () => {
  return (
    <Wrapper>
      <Sidebar>
        <Section title="visual editor" id="visual" />
        <FilesSection />
      </Sidebar>
      <CodeEditor />
    </Wrapper>
  );
};
