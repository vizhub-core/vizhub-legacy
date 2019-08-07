import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { URLStateContext } from '../../URLStateContext';
import { modExpandEditor, modShowEditor } from '../../../../mobileMods';
import { Sidebar } from './styles';
import { Section } from './Section';
import { FilesSection } from './FilesSection';
import { CodeEditor } from './CodeEditor';
import { useEditorTheme } from './useEditorTheme';

export const Editor = () => {
  const { showEditor, activeFile } = useContext(URLStateContext);
  const editorTheme = useEditorTheme();

  return (
    <ThemeProvider theme={{ editor: editorTheme }}>
      <>
        {modShowEditor(showEditor, activeFile) ? (
          <Sidebar expand={modExpandEditor(showEditor)} className="test-editor">
            <Section title="visual editor" id="visual" />
            <FilesSection />
          </Sidebar>
        ) : null}
        {activeFile ? <CodeEditor /> : null}
      </>
    </ThemeProvider>
  );
};
