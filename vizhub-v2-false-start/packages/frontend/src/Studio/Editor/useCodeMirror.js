import { useCodeMirrorDynamicImport } from './useCodeMirrorDynamicImport';

const views = {};

const emitOps = ops => {
  console.log('emit that shit');
  console.log(JSON.stringify(ops));
};

const createView = (CodeMirror, id, text, extension) => {
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
      ot(['working', 'files', id], emitOps)
    ]
  });
  return new EditorView({ state });
};
const getOrCreateView = (CodeMirror, id, text, extension) =>
  views[id] || (views[id] = createView(CodeMirror, id, text, extension));

export const useCodeMirror = (id, text, extension) => {
  const CodeMirror = useCodeMirrorDynamicImport();
  return CodeMirror && id && getOrCreateView(CodeMirror, id, text, extension);
};
