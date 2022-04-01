import { setup } from './setup';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
//import { javascript } from '@codemirror/lang-javascript';
import { json1Sync } from './json1Sync';

const getAtPath = ({ shareDBDoc, path }) =>
  path.reduce((accumulator, key) => accumulator[key], shareDBDoc.data);
// {
//   let value = shareDBDoc.data;
//   for(const key of path){
//     value = value[key];
//   }
//   return value;
// }

export const createEditor = ({ shareDBDoc, path }) =>
  new EditorView({
    state: EditorState.create({
      doc: getAtPath({ shareDBDoc, path }),
      extensions: [setup, json1Sync({ shareDBDoc, path })],
      //extensions: [setup, javascript()],
    }),
  });
