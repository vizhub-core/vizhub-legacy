import React, { useContext } from 'react';
import { URLStateContext } from '../../URLStateContext';
import { Sidebar } from './styles';
import { Section } from './Section';
import { FilesSection } from './FilesSection';
import { CodeEditor } from './CodeEditor';
import { isSmallScreen } from '../../isSmallScreen'

export const Editor = () => {
  const { showEditor } = useContext(URLStateContext);

  const expand = isSmallScreen && showEditor;

  return (
    <>
      {showEditor ? (
        <Sidebar expand={expand}>
          <Section title="visual editor" id="visual" />
          <FilesSection />
        </Sidebar>
      ) : null}
      <CodeEditor />
    </>
  );
};
