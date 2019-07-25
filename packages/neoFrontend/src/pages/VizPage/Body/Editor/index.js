import React, { useContext } from 'react';
import { URLStateContext } from '../../URLStateContext';
import { Sidebar } from './styles';
import { Section } from './Section';
import { FilesSection } from './FilesSection';
import { CodeEditor } from './CodeEditor';

export const Editor = () => {
  const { showEditor, showViewer } = useContext(URLStateContext);
  return (
    <>
      {showEditor ? (
        <Sidebar showViewer={showViewer}>
          <Section title="visual editor" id="visual" />
          <FilesSection />
        </Sidebar>
      ) : null}
      <CodeEditor />
    </>
  );
};
