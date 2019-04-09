const views = {};

const createView = options => {
  const { CodeMirror, fileId, text, mode, emitOps } = options;
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
    ot
  } = CodeMirror;

  const path = ['working', 'files', fileId, 'text'];

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
      ot(path, emitOps)
    ]
  });
  return new EditorView({ state });
};

const getOrCreateView = options => {
  const id = options.fileId;
  return views[id] || (views[id] = createView(options));
};

export const useEditorView = options => {
  const { CodeMirror, fileId } = options;
  return CodeMirror && fileId && getOrCreateView(options);
};
