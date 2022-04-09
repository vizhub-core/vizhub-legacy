import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import { VizPage, Spinner } from '../ui';
import { useShareDBConnection } from './useShareDBConnection';
import { useViz } from './useViz';
import { LogInWidgetPresenter } from './LogInWidgetPresenter';
import { useEditorModules } from './useEditorModules';

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

// TODO get this to work
//import { otPlugin, opsToTransaction } from 'codemirror-ot';
//
//// TODO unify with implementation in codemirror-ot tests.
//const atPath = (obj, path) => path.reduce((d, key) => d[key], obj);
//
//// TODO research if this is already implemented elsewhere in the ShareDB universe.
//const pathMatches = (op, path) => {
//  if (op.length !== 1) {
//    return false;
//  }
//  const opPath = op[0].p;
//  if (opPath.length < path.length) {
//    return false;
//  }
//  return path.every((pathEntry, i) => pathEntry === opPath[i]);
//};

// Inspired by https://github.com/vizhub-core/codemirror-6-experiments/blob/master/packages/experiments/src/client/codeMirrorShareDBBinding.js

//export const createView = options => {
//  const { doc, otPlugin } = options;
//
//  const mode = legacyMode(javascript({ indentUnit: 2 }, {}));
//
//  let plugins = [mode];
//
//    plugins = plugins.concat([
//      gutter(),
//      history(),
//      matchBrackets({ decorationsPlugin: mode }),
//      keymap(historyKeymap()),
//      keymap(indentationKeymap(mode)),
//      keymap(baseKeymap)
//    ]);
//    if (otPlugin) {
//      plugins = plugins.concat(otPlugin);
//    }
//
//  const state = EditorState.create({ doc, plugins });
//
//  return new EditorView(state);
//};
//const getOrCreateView = shareDBDoc => function(files, fileId) {
//  if (!views[fileId]) {
//    const path = ['files', fileId, 'text'];
//
//    this.views[fileName] = CodeMirrorShareDBBinding({
//      path,
//      shareDBDoc,
//      createView
//    });
//  }
//  return this.views[fileName];
//};
//export const CodeMirrorShareDBBinding = options => {
//  const {
//    shareDBDoc,
//    editorView,
//    path = [], // The path of the field in the json1 document
//  } = options;
//
//  let otPlugin;
//  let applyingOpTransaction = false;
//
//  if (isClient) {
//    const submitOp = op => {
//      if (!applyingOpTransaction) {
//        shareDBDoc.submitOp(op)
//      }
//    };
//
//    otPlugin = otPlugin(path, emitOps);
//  }
//
//  const doc = atPath(shareDBDoc.data, path);
//
//  const view = createView({
//    otPlugin: otPluginBrowser,
//    doc
//  });
//
//  if (process.browser) {
//    shareDBDoc.on('op', (op, originatedLocally) => {
//      if (!originatedLocally && pathMatches(op, path)) {
//        applyingOpTransaction = true;
//        view.dispatch(opsToTransaction(path, view.state, op));
//        applyingOpTransaction = false;
//      }
//    });
//  }
//
//  return view;
//};

const CodeEditorBody = ({
  editorModules: { VizHubCodemirror },
  vizContentDoc,
  activeFileId,
}) => {
  const ref = useRef();
  useEffect(() => {
    const editor = VizHubCodeMirror.createEditor({
      shareDBDoc: vizContentDoc,
      path: ['files', '7548392', 'text'],
      debug: true,
    });
    console.log(vizContentDoc.data);

    //const editor = VizHubCodeMirror.createEditor({
    //  doc: vizContentDoc.data.files[activeFileId].text,
    //});
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
