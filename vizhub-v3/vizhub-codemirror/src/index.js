import { setup } from './setup';
import { EditorView, ViewPlugin } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { json1Sync } from 'codemirror-ot';
//import { vizhubHighlightStyle } from './vizhubHighlightStyle';

const getAtPath = ({ shareDBDoc, path }) =>
  path.reduce((accumulator, key) => accumulator[key], shareDBDoc.data);

// TODO make this dynamic - what happens if extension is changed?
const langByFileExtension = {
  js: javascript,
  html,
  // TODO "css", "md", "json", "html"
};

export const createEditor = ({
  shareDBDoc,
  path,
  fileExtension,
  additionalExtensions = [],
  debug = false,
}) => {
  return new EditorView({
    state: EditorState.create({
      doc: getAtPath({ shareDBDoc, path }),
      extensions: [
        setup,
        json1Sync({ shareDBDoc, path, debug }),
        ////vizhubHighlightStyle,
        ...(fileExtension && fileExtension in langByFileExtension
          ? [langByFileExtension[fileExtension]()]
          : []),
        //...additionalExtensions,
      ],
    }),
  });
};
