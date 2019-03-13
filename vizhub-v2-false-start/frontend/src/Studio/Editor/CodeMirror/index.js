import React, {useRef, useEffect} from 'react';
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
  multipleSelections,
} from 'codemirror-6-prerelease';
import styled, {createGlobalStyle} from 'styled-components';
import { mono } from '../../../styles.js';
const CodeMirrorTheme = createGlobalStyle`
  .codemirror {
    font-family: '${mono.family}';
    line-height: 1.1;
    font-size: 24pt;
  }
  .codemirror, .codemirror-gutter {
    background-color: #300a24;
  }
  .codemirror ::selection {
    background-color: #b6b6b6;
  }
  .codemirror-gutter {
    border-right: 1px solid #533d51;
  }
  .codemirror-gutter-element {
    color: #fce94f;
  }
  .codemirror-content {
    caret-color: white;
  }

  .cm-keyword,
  .cm-comment,
  .cm-bracket,
  .cm-attribute,
  .codemirror-matchingbracket {
    color: #34e2e2; /* neon blue */
  }

  .cm-atom,
  .cm-string,
  .cm-string-2,
  .cm-qualifier {
    color: #ad7fa8; /* purple */
  }

  .cm-property {
    color: #87ffaf; /* pale green */
  }
`;

export const CodeMirror = ({initialDoc}) => {
  const ref = useRef();

  useEffect(() => {
    const mode = legacyMode({mode: javascript({indentUnit: 2}, {})});

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
          'Shift-Tab': indentSelection,
        }),
        keymap(baseKeymap),
      ],
    });

    const view = (window.view = new EditorView({state}));
    ref.current.appendChild(view.dom);
  }, []);

  return (
    <>
      <CodeMirrorTheme />
      <div ref={ref} />
    </>
  );
};
