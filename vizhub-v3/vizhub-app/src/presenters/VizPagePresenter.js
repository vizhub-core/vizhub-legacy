import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { VizPage, Spinner } from '../ui';
import { useShareDBConnection } from './useShareDBConnection';
import { useViz } from './useViz';
import { LogInWidgetPresenter } from './LogInWidgetPresenter';
import { jsDelivrCombine } from '../jsDelivrCombine';

const Body = ({
  viz: {
    vizInfo: { title },
    vizContent: { files },
  },
  renderLogInWigdet,
  renderCodeEditor,
}) => {
  // Compute an alphabetized list of file metadata
  // for use in the editor sidebar.
  const sortedFileMetadata = useMemo(
    () =>
      Object.entries(files)
        .map(([fileId, file]) => ({
          fileId,
          name: file.name,
        }))
        .sort((a, b) => {
          items.sort((a, b) =>
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          );
        }),
    [files]
  );

  // This function gets the name of a file
  // for a given file id.
  const getFileName = useCallback(
    (vizFileId) => files[vizFileId].name,
    [files]
  );

  return (
    <VizPage
      title={title}
      sortedFileMetadata={sortedFileMetadata}
      files={files}
      getFileName={getFileName}
      renderCodeEditor={renderCodeEditor}
      renderLogInWigdet={renderLogInWigdet}
    />
  );
};

// Loads JavaScript dynamically.
const loadScript = (url) =>
  new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => {
      resolve();
    };
    document.head.appendChild(script);
  });

// Global singleton of cached modules,
// because we don't want to append the same <script> tag twice.
let cachedEditorModules = null;
const useEditorModules = () => {
  const [editorModules, setEditorModules] = useState(cachedEditorModules);

  const libraries = jsDelivrCombine([
    `vizhub-codemirror@0.1.0/dist/vizhubCodemirror.min.js`,
  ]);

  useEffect(async () => {
    await loadScript(libraries);
    setEditorModules({ VizHubCodemirror: window.VizHubCodemirror });
  }, []);
  return editorModules;
};

const CodeEditorBody = ({
  editorModules: { VizHubCodemirror },
  vizContentDoc,
  activeFileId,
}) => {
  const ref = useRef();
  useEffect(() => {
    const editor = VizHubCodeMirror.createEditor({
      doc: vizContentDoc.data.files[activeFileId].text,
    });
    ref.current.appendChild(editor.dom);
  }, []);
  return <div className="editor-content-code-editor" ref={ref} />;
};

const CodeEditor = ({ vizContentDoc, activeFileId }) => {
  const editorModules = useEditorModules();

  return editorModules ? (
    <CodeEditorBody
      vizContentDoc={vizContentDoc}
      activeFileId={activeFileId}
      editorModules={editorModules}
    />
  ) : (
    <Spinner />
  );
};

export const VizPagePresenter = ({ pageData, renderLogInWigdet }) => {
  // Initialize the ShareDB connection via WebSocket.
  const shareDBConnection = useShareDBConnection();

  const { vizSnapshot } = pageData;
  const { viz, vizContentDoc } = useViz({ vizSnapshot, shareDBConnection });

  return viz ? (
    <Body
      viz={viz}
      renderLogInWigdet={() => (
        <LogInWidgetPresenter authenticatedUser={pageData.authenticatedUser} />
      )}
      renderCodeEditor={(activeFileId) => (
        <CodeEditor vizContentDoc={vizContentDoc} activeFileId={activeFileId} />
      )}
    />
  ) : (
    // TODO styling for this case
    'This viz was deleted'
  );
};
