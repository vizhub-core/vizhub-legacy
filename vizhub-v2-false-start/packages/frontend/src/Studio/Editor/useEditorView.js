import { type as json0 } from 'ot-json0';
import { opsToTransaction } from 'codemirror-ot';

const views = {};

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
  const state = EditorState.create({
    doc: text,
    extensions: [
      lineNumbers(),
      history(),
      specialChars(),
      multipleSelections(),
      mode,
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
      //ot(path, emitLocalOps),
      //presence(path, userId, submitPresence, applyingRemoteOp)
    ]
  });

  const editorView = new EditorView({ state });

  // TODO unsubscribe
  // consider "editor view pool" idea?
  // or, unsubscribe from all views when vizId changes?
  subscribeToOps((op, originatedLocally) => {
    if (!originatedLocally && json0.canOpAffectPath(op[0], path)) {
      isApplyingRemoteOp = true;
      editorView.dispatch(opsToTransaction(path, editorView.state, op));
      isApplyingRemoteOp = false;
    }
  });

  subscribeToPresence(presenceObjects => {
    displayPresence(
      presenceObjects.map(presenceObject => {
        const [from, to] = presenceObject.s.s[0];
        return {
          presence: presenceObject,
          pixelCoordsFrom: editorView.coordsAtPos(from),
          pixelCoordsTo: editorView.coordsAtPos(to)
        };
      })
    );
  });

  return editorView;
};

const getOrCreateView = options => {
  const id = options.fileId;
  return views[id] || (views[id] = createView(options));
};

export const useEditorView = options => {
  const { CodeMirror, fileId } = options;
  return CodeMirror && fileId && getOrCreateView(options);
};
