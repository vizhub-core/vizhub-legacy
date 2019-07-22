import React, { useContext } from 'react';
import { URLStateContext } from '../../URLStateContext';
import { Wrapper, Sidebar } from './styles';
import { Section } from './Section';
import { FilesSection } from './FilesSection';
import { CodeEditor } from './CodeEditor';

export const Editor = () => {
  const { showEditor } = useContext(URLStateContext);
  return (
    <Wrapper>
      {showEditor ? (
        <Sidebar>
          <Section title="visual editor" id="visual" />
          <FilesSection />
        </Sidebar>
      ) : null}
      <CodeEditor />
    </Wrapper>
  );
};
