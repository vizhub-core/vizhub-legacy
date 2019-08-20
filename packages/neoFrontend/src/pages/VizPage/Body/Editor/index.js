import React, { useContext, useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { URLStateContext } from '../../URLStateContext';
import { EditorModulesContext } from '../../EditorModulesContext';
import { modExpandEditor, modShowEditor } from '../../../../mobileMods';
import { Sidebar, Top, Bottom } from './styles';
import { BottomButtons } from './BottomButtons';
import { Section } from './Section';
import { FilesSection } from './FilesSection';
import { CodeEditor } from './CodeEditor';
import { useEditorTheme } from './useEditorTheme';

const defaultRotation = 0.397;

export const Editor = () => {
  const { showEditor, activeFile } = useContext(URLStateContext);
  const [rotation, setRotation] = useState(defaultRotation);
  const [rotationEnabled, setRotationEnabled] = useState(false);
  const [isRenamingNewFile, setIsRenamingNewFile] = useState(false);
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

  const onNewFileClick = useCallback(() => {
    setIsRenamingNewFile(true);
  }, [setIsRenamingNewFile]);

  return (
    <ThemeProvider theme={{ editor: editorTheme }}>
      <>
        {moddedShowEditor ? (
          <Sidebar expand={modExpandEditor(showEditor)} className="test-editor">
            <Top>
              <Section title="visual editor" id="visual" />
              <FilesSection isRenamingNewFile={isRenamingNewFile} />
              {rotationEnabled
                ? editorTheme.colors.map((color, i) => (
                    <div style={{ background: color, height: '20px' }} />
                  ))
                : null}
            </Top>
            <Bottom>
              <BottomButtons
                activeFile={activeFile}
                onNewFileClick={onNewFileClick}
              />
            </Bottom>
          </Sidebar>
        ) : null}
        {activeFile ? <CodeEditor /> : null}
      </>
    </ThemeProvider>
  );
};
