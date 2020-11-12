import React, { useContext, useMemo } from 'react';
import { getVizFile } from 'vizhub-presenters';
import { parseRangeBoundariesString } from '../../../../../utils/number';
import { LoadingScreen } from '../../../../../LoadingScreen';
import { URLStateContext } from '../../../URLStateContext';
import { EditorModulesContext } from '../../../EditorModulesContext';
import { VizContext } from '../../../VizContext';
import { light } from '../themes/vizHub';
import { CodeMirrorReactBinding } from '../CodeEditor/CodeArea/CodeAreaCodeMirror5/CodeMirrorReactBinding';
import { useFileIndex } from '../CodeEditor/useFileIndex';
import { Wrapper } from './styles';
// import { CodeEditorHeader } from './CodeEditorHeader';

export const CodeSnippet = ({ showTop }) => {
  const { range: rangeString, selectedLines, activeFile, openLink } = useContext(URLStateContext);
  const { editorModules, loadEditorModules } = useContext(EditorModulesContext);
  const { viz$ } = useContext(VizContext);

  // Request to load editor modules.
  // This line is only strictly required in the case that the user opens a link
  // where the editor sidebar is closed, but the code editor is open.
  // This is a no-op if the modules are already loaded.
  loadEditorModules();

  const fileIndex = useFileIndex(viz$, activeFile);

  const range = useMemo(() => parseRangeBoundariesString(rangeString), [rangeString]);

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
    <Wrapper
      showLeftBorder={true}
      style={{ flex: '1' }}
    >
      {/* <CodeEditorHeader
        showTop={showTop}
        toggleShowTop={null}
        showEditor={showEditor}
        activeFile={activeFile}
        viewer={null}
        onShowViz={onShowViz}
        onHideViz={onHideViz}
        closeActiveFile={closeActiveFile}
      /> */}
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
