import { setup } from './setup';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
//import { javascript } from '@codemirror/lang-javascript';
import { json1Sync } from 'codemirror-ot';

const getAtPath = ({ shareDBDoc, path }) =>
  path.reduce((accumulator, key) => accumulator[key], shareDBDoc.data);

export const createEditor = ({
  shareDBDoc,
  path,
  additionalExtensions,
  debug = false,
}) =>
  new EditorView({
    state: EditorState.create({
      doc: getAtPath({ shareDBDoc, path }),
      extensions: [setup, json1Sync({ shareDBDoc, path, debug })],
      ...additionalExtensions,
      //extensions: [setup, javascript()],
    }),
  });
