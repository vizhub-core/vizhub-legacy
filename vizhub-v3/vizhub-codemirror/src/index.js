import { setup } from './setup';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
//import { javascript } from '@codemirror/lang-javascript';

// TODO just export the setup function, nothing else.
export const createEditor = ({ doc }) => {
  const editor = new EditorView({
    state: EditorState.create({
      extensions: [setup],
      //extensions: [setup, javascript()],
      doc,
    }),
  });
  return editor;
};
