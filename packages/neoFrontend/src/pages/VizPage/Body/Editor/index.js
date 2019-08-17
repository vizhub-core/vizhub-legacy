import React, { useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { URLStateContext } from '../../URLStateContext';
import { EditorModulesContext } from '../../EditorModulesContext';
import { modExpandEditor, modShowEditor } from '../../../../mobileMods';
import { Sidebar, Bottom, BottomButtons } from './styles';
import { Section } from './Section';
import { FilesSection } from './FilesSection';
import { CodeEditor } from './CodeEditor';
import { useEditorTheme } from './useEditorTheme';

const defaultRotation = 0.397;

export const Editor = () => {
  const { showEditor, activeFile } = useContext(URLStateContext);
  const [rotation, setRotation] = useState(defaultRotation);
  const [rotationEnabled, setRotationEnabled] = useState(false);
  const editorTheme = useEditorTheme(rotation);

  const { loadEditorModules } = useContext(EditorModulesContext);

  // Easter egg.
  window.vizhub.enableColorRotation = () => {
    setRotationEnabled(true);
    window.addEventListener('mousemove', event => {
      setRotation(event.clientX / 1000);
    });
  };

  const moddedShowEditor = modShowEditor(showEditor, activeFile);

  // Request to load code editor modules if the editor is showing.
  // This is pre-loading in anticipation of the user opening a file,
  // so that the editor modules will be loaded by the time a file is opened.
  // If the user never opens a file, the fetching here will be wasted kBs transferred.
  if (moddedShowEditor) {
    loadEditorModules();
  }

  return (
    <ThemeProvider theme={{ editor: editorTheme }}>
      <>
        {moddedShowEditor ? (
          <Sidebar expand={modExpandEditor(showEditor)} className="test-editor">
            <Section title="visual editor" id="visual" />
            <FilesSection />
            {rotationEnabled
              ? editorTheme.colors.map((color, i) => (
                  <div style={{ background: color, height: '20px' }} />
                ))
              : null}
            <Bottom>
              <BottomButtons />
            </Bottom>
          </Sidebar>
        ) : null}
        {activeFile ? <CodeEditor /> : null}
      </>
    </ThemeProvider>
  );
};
