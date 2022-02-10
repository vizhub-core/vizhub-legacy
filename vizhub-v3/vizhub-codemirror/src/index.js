import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';

const editor = new EditorView({
  state: EditorState.create({
    extensions: [basicSetup, javascript()],
  }),
  parent: document.body,
});
