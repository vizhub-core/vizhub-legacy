import { useCodeMirrorDynamicImport } from './useCodeMirrorDynamicImport';

const views = {};

const createView = (CodeMirror, id, options) => {
  const { text, extension, emitOps } = options;
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
    css,
    specialChars,
    multipleSelections,
    ot
  } = CodeMirror;

  const modesByExtension = { js: javascript, css };
  const modeOfExtension = modesByExtension[extension] || javascript;
  const mode = legacyMode({ mode: modeOfExtension({ indentUnit: 2 }, {}) });
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
      ot(['working', 'files', id, 'text'], emitOps)
    ]
  });
  return new EditorView({ state });
};

const getOrCreateView = (CodeMirror, id, options) =>
  views[id] || (views[id] = createView(CodeMirror, id, options));

export const useCodeMirror = (id, options) => {
  const CodeMirror = useCodeMirrorDynamicImport();
  return CodeMirror && id && getOrCreateView(CodeMirror, id, options);
};
