import React, {useRef} from 'react';
import {
  EditorState,
  EditorSelection,
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
  multipleSelections,
} from 'codemirror-6-prerelease';

export const CodeMirror = () => {
  const ref = useRef();

  useEffect(() => {
    const mode = legacyMode({mode: javascript({indentUnit: 2}, {})});

    const isMac = /Mac/.test(navigator.platform);
    const state = EditorState.create({
      doc,
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
          'Shift-Tab': indentSelection,
        }),
        keymap(baseKeymap),
      ],
    });

    const view = (window.view = new EditorView({state}));
    ref.current.appendChild(view.dom);
  }, []);

  return <div ref={ref} />;
};
