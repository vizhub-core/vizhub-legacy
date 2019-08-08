import React, { useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { URLStateContext } from '../../URLStateContext';
import { modExpandEditor, modShowEditor } from '../../../../mobileMods';
import { Sidebar } from './styles';
import { Section } from './Section';
import { FilesSection } from './FilesSection';
import { CodeEditor } from './CodeEditor';
import { useEditorTheme } from './useEditorTheme';

const defaultRotation = 0.397;

export const Editor = () => {
  const { showEditor, activeFile } = useContext(URLStateContext);
  const [rotation, setRotation] = useState(defaultRotation);
  const editorTheme = useEditorTheme(rotation);

  // Easter egg.
  window.enableRotation = () => {
    window.addEventListener('mousemove', event => {
      setRotation(event.clientX / 1000);
    });
  };

  return (
    <ThemeProvider theme={{ editor: editorTheme }}>
      <>
        {modShowEditor(showEditor, activeFile) ? (
          <Sidebar expand={modExpandEditor(showEditor)} className="test-editor">
            <Section title="visual editor" id="visual" />
            <FilesSection />
            {rotation !== defaultRotation
              ? editorTheme.colors.map((color, i) => (
                  <div style={{ background: color, height: '20px' }} />
                ))
              : null}
          </Sidebar>
        ) : null}
        {activeFile ? <CodeEditor /> : null}
      </>
    </ThemeProvider>
  );
};
