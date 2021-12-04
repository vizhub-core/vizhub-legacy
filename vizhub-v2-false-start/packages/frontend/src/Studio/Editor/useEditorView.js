import { type as json0 } from 'ot-json0';
import { opsToTransaction } from 'codemirror-ot';
import { enablePresence } from '../../environment';
import { getFileId } from './PresenceDisplay/getFileId';

const createView = options => {
  const {
    CodeMirror,
    fileId,
    text,
    mode,
    emitOps, // TODO change to submitOp
    subscribeToOps,
    submitPresence,
    subscribeToPresence,
    userId,
    displayPresence
  } = options;

  const {
    EditorState,
    EditorView,
    keymap,
    history,
    redo,
    redoSelection,
    undo,
    undoSelection,
    lineNumbers,
    baseKeymap,
    indentSelection,
    matchBrackets,
    specialChars,
    multipleSelections,
    ot,
    presence
  } = CodeMirror;

  // TODO extract to accessors/constructors
  const path = ['working', 'files', fileId, 'text'];

  let isApplyingRemoteOp = false;
  const applyingRemoteOp = () => isApplyingRemoteOp;

  // TODO change upstream to accept applyingRemoteOp.
  const emitLocalOps = ops => {
    if (!isApplyingRemoteOp) {
      emitOps(ops);
    }
  };

  const isMac = /Mac/.test(navigator.platform);
  const extensions = [
    lineNumbers(),
    history(),
    specialChars(),
    multipleSelections(),
    matchBrackets(),
    keymap({
      'Mod-z': undo,
      'Mod-Shift-z': redo,
      'Mod-u': view => undoSelection(view) || true,
      [isMac ? 'Mod-Shift-u' : 'Alt-u']: redoSelection,
      'Ctrl-y': isMac ? undefined : redo,
      'Shift-Tab': indentSelection
    }),
    keymap(baseKeymap),
    ot(path, emitLocalOps)
  ];

  if (mode) {
    extensions.push(mode);
  }

  if (enablePresence) {
    extensions.push(presence(path, userId, submitPresence, applyingRemoteOp));
  }

  const state = EditorState.create({
    doc: text,
    extensions
  });

  // View construction can be an
  const editorView = new EditorView({ state });

  // TODO unsubscribe
  // consider "editor view pool" idea?
  // or, unsubscribe from all views when vizId changes?
  const unsubscribeFromOps = subscribeToOps((op, originatedLocally) => {
    if (!originatedLocally && json0.canOpAffectPath(op[0], path)) {
      isApplyingRemoteOp = true;
      editorView.dispatch(opsToTransaction(path, editorView.state, op));
      isApplyingRemoteOp = false;
    }
  });

  // TODO unsubscribe
  // TODO move this logic somewhere else.
  // It doesn't feel right to have this subscription in each and every view.
  const unsubscribeFromPresence = subscribeToPresence(presenceObjects => {
    console.log('subscribed to presence in view for file ' + fileId);
    displayPresence(
      presenceObjects
        // TODO cover this with tests.
        // Don't try to convert coordinates for presence in a different file.
        .filter(presenceObject => getFileId(presenceObject) === fileId)
        .map(presenceObject => {
          const [from, to] = presenceObject.s.s[0];
          return {
            presence: presenceObject,
            pixelCoordsFrom: editorView.coordsAtPos(from),
            pixelCoordsTo: editorView.coordsAtPos(to)
          };
        })
    );
  });

  editorView.destroy = () => {
    // TODO add a test that covers this
    console.log('cleaning up editor view');

    // TODO test unsubscribe from ops
    unsubscribeFromOps();

    // TODO test unsubscribe from presence
    unsubscribeFromPresence();
  };

  return editorView;
};

const getOrCreateView = options => {
  const { fileId, editorViewPool } = options;
  const view = editorViewPool.getView(fileId);
  if (!view) {
    return editorViewPool.setView(fileId, createView(options));
  }
  return view;
};

export const useEditorView = options => {
  const { CodeMirror, fileId } = options;
  return CodeMirror && fileId && getOrCreateView(options);
};
