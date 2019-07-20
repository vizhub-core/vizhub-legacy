import React from 'react';
import { Wrapper, Sidebar, CodeEditor } from './styles';
import { Section } from './Section';
import { FilesSection } from './FilesSection';

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
