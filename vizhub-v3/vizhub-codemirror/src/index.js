import { EditorState } from '@codemirror/state';
import { EditorView, ViewPlugin } from '@codemirror/view';
import { json1Sync } from 'codemirror-ot';
import { vizhubHighlightStyle } from './vizhubHighlightStyle';

// TODO pull in stuff from @codemirror/basic-setup

// TODO language-specific highlighting
// TODO make this dynamic - what happens if extension is changed?
// Something like this https://codemirror.net/6/examples/language/
//import { javascript } from '@codemirror/lang-javascript';
//import { html } from '@codemirror/lang-html';
// const langByFileExtension = {
//   js: javascript,
//   html,
//   // TODO "css", "md", "json", "html"
// };

//const json1Sync = ({ shareDBDoc, path = [], debug = false }) => {
//  return ViewPlugin.fromClass(
//    class {
//    }
//  )
//}

const getAtPath = ({ shareDBDoc, path }) =>
  path.reduce((accumulator, key) => accumulator[key], shareDBDoc.data);

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
        ///...(fileExtension && fileExtension in langByFileExtension
        ///  ? [langByFileExtension[fileExtension]()]
        ///  : []),
      ],
    }),
  });
};
