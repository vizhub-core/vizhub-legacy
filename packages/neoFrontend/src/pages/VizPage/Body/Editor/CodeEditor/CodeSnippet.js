import React, { useContext, useMemo } from 'react';
import { useLocation } from 'react-router';
import { getVizFile } from 'vizhub-presenters';
import { domain } from '../../../../../constants';
import { parseRangeBoundariesString } from '../../../../../utils/number';
import { LoadingScreen } from '../../../../../LoadingScreen';
import { URLStateContext } from '../../../URLStateContext';
import { EditorModulesContext } from '../../../EditorModulesContext';
import { VizContext } from '../../../VizContext';
import { light } from '../themes/vizHub';
import { CodeMirrorReactBinding } from '../CodeEditor/CodeArea/CodeAreaCodeMirror5/CodeMirrorReactBinding';
import { useFileIndex } from '../CodeEditor/useFileIndex';
import { Header } from './CodeEditorHeader/Header';
import { Wrapper, HeaderLink } from './styles';

export const CodeSnippet = () => {
  const { pathname } = useLocation();
  const {
    range: rangeString,
    selectedLines,
    activeFile,
    openLink,
  } = useContext(URLStateContext);
  const { editorModules, loadEditorModules } = useContext(EditorModulesContext);
  const { viz$ } = useContext(VizContext);

  // Request to load editor modules.
  // This line is only strictly required in the case that the user opens a link
  // where the editor sidebar is closed, but the code editor is open.
  // This is a no-op if the modules are already loaded.
  loadEditorModules();

  const fileIndex = useFileIndex(viz$, activeFile);

  const range = useMemo(() => parseRangeBoundariesString(rangeString), [
    rangeString,
  ]);

  const link = `${domain}${pathname}?file=${activeFile}#L${range[0]}`;

  const fileText = useMemo(() => {
    const file = getVizFile(fileIndex)(viz$.getValue());

    // If the file does not exist at this point, it means that
    // we are accessing a URL that has a file "open" that doesn't exist,
    // either because it's been renamed or deleted.
    // In this case, we bail out to avoid a crash.
    if (!file) {
      return null;
    }

    return file.text
      .split('\n')
      .slice(...range)
      .join('\n');
  }, [viz$, fileIndex, range]);

  return (
    <Wrapper showLeftBorder={true} style={{ flex: '1' }}>
      <Header showEditor={false} activeFile={activeFile}>
        <HeaderLink href={link}>Edit in vizhub</HeaderLink>
      </Header>
      <>
        <CodeMirrorReactBinding
          readonly
          fileText={fileText}
          fileName={activeFile}
          firstLineNumber={range[0]}
          selectedLines={selectedLines}
          editorModules={editorModules}
          onLinkClick={openLink}
        />
        {!editorModules ? <LoadingScreen color={light} isChild={true} /> : null}
      </>
    </Wrapper>
  );
};
