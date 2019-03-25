import { useCodeMirrorDynamicImport } from './useCodeMirrorDynamicImport';

const views = {};

const createView = (CodeMirror, id, text) => {
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
    legacyMode,
    matchBrackets,
    javascript,
    specialChars,
    multipleSelections
  } = CodeMirror;
  const mode = legacyMode({ mode: javascript({ indentUnit: 2 }, {}) });
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
      keymap(baseKeymap)
    ]
  });
  const view = new EditorView({ state });
  views[id] = view;
  return view;
};

const getOrCreateEditorView = (CodeMirror, id, text) =>
  views[id] || (views[id] = createView(CodeMirror, id, text));

export const useCodeMirror = (id, text) => {
  const CodeMirror = useCodeMirrorDynamicImport();
  return CodeMirror && id
    ? getOrCreateEditorView(CodeMirror, id, text)
    : undefined;
};
