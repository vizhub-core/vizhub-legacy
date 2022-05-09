import { EditorView } from '@codemirror/view';

// Inspired by
// https://codemirror.net/6/examples/styling/
export const vizhubHighlightStyle = EditorView.theme(
  {
    '&': {
      color: 'white',
      backgroundColor: '#202e46',
    },
    '.cm-content': {
      caretColor: 'white',
    },
  },
  { dark: true }
  // TODO VizHub editor theme code colors
);
