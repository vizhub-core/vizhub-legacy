import { setup } from './setup';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
//import { javascript } from '@codemirror/lang-javascript';

const editor = new EditorView({
  state: EditorState.create({
    extensions: [setup],
    //extensions: [setup, javascript()],
  }),
  parent: document.body,
});
