import React from 'react';
import { ThemeProvider } from 'styled-components';
import { CodeSnippet } from './Editor/CodeEditor/CodeSnippet';
import { useEditorTheme } from './Editor/useEditorTheme';
import { Wrapper, Bottom } from './styles';

const rotation = 0.397;

export const SnippetModePresenter = () => {
  const editorTheme = useEditorTheme(rotation);

  return (
    <ThemeProvider theme={{ editor: editorTheme }}>
      <Wrapper>
        <Bottom>
          <CodeSnippet showTop={true} />
        </Bottom>
      </Wrapper>
    </ThemeProvider>
  );
};
