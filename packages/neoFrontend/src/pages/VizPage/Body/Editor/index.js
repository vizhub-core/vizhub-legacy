import React, { useContext } from 'react';
import { URLStateContext } from '../../URLStateContext';
import { modExpandEditor, modShowEditor } from '../../../../mobileMods';
import { Sidebar } from './styles';
import { Section } from './Section';
import { FilesSection } from './FilesSection';
import { CodeEditor } from './CodeEditor';

export const Editor = () => {
  const { showEditor, activeFile } = useContext(URLStateContext);

  return (
    <>
      {modShowEditor(showEditor, activeFile) ? (
        <Sidebar expand={modExpandEditor(showEditor)} className="test-editor">
          <Section title="visual editor" id="visual" />
          <FilesSection />
        </Sidebar>
      ) : null}
      <CodeEditor />
    </>
  );
};
