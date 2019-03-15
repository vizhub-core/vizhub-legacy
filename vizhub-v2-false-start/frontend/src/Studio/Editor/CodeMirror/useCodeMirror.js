import { useEffect, useState } from 'react';
import {
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
} from '@datavis-tech/codemirror-6-prerelease';

export const useCodeMirror = initialDoc => {
  const [view, setView] = useState();
  useEffect(() => {
    const mode = legacyMode({ mode: javascript({ indentUnit: 2 }, {}) });
    const isMac = /Mac/.test(navigator.platform);
    const state = EditorState.create({
      doc: initialDoc,
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
    setView(view);
  }, []);

  return view;
};
