import { EditorView, ViewPlugin } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { json1Sync } from 'codemirror-ot';

// TODO pull in stuff from @codemirror/basic-setup

const getAtPath = ({ shareDBDoc, path }) =>
  path.reduce((accumulator, key) => accumulator[key], shareDBDoc.data);

// TODO make this dynamic - what happens if extension is changed?
// Something like this https://codemirror.net/6/examples/language/
const langByFileExtension = {
  js: javascript,
  html,
  // TODO "css", "md", "json", "html"
};

// Inspired by
// https://codemirror.net/6/examples/styling/
const vizhubHighlightStyle = EditorView.theme(
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
);

export const createEditor = ({
  shareDBDoc,
  path,
  fileExtension,
  debug = false,
}) => {
  return new EditorView({
    state: EditorState.create({
      doc: getAtPath({ shareDBDoc, path }),
      extensions: [
        json1Sync({ shareDBDoc, path, debug }),
        vizhubHighlightStyle,
        ...(fileExtension && fileExtension in langByFileExtension
          ? [langByFileExtension[fileExtension]()]
          : []),
      ],
    }),
  });
};
