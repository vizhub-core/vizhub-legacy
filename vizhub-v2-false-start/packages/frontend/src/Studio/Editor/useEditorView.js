import { type as json0 } from 'ot-json0';
import { opsToTransaction } from 'codemirror-ot';
import { enablePresence } from '../../environment';

// A cache of view instances.
// The idea is that this will exist once per visualization.
// When the user navigates between visualizations,
// all these views (and their corresponding subscriptions)
// should be cleaned up.
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
  const extensions = [
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
    ot(path, emitLocalOps)
  ];
  if (enablePresence) {
    extensions.push(presence(path, userId, submitPresence, applyingRemoteOp));
  }

  const state = EditorState.create({
    doc: text,
    extensions
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

  // TODO move this logic somewhere else.
  // It doesn't feel right to have this subscription in each and every view.
  subscribeToPresence(presenceObjects => {
    console.log('subscribed to presence in view for file ' + fileId);
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
