// Derived from node_modules/codemirror/addon/dialog/dialog.css
export const CodeMirrorDialogCSS = `
.CodeMirror-dialog {
  position: absolute;
  left: 0; right: 0;
  background: inherit;
  z-index: 15;
  padding: .1em .8em;
  overflow: hidden;
  color: inherit;
}

.CodeMirror-dialog-top {
  border-bottom: 1px solid #3d4b65;
  top: 0;
}

.CodeMirror-dialog-bottom {
  border-top: 1px solid #3d4b65;
  bottom: 0;
}

.CodeMirror-dialog input {
  border: none;
  outline: none;
  background: transparent;
  width: 20em;
  color: inherit;
  font-family: ${props => props.theme.editor.font.family};
}

.CodeMirror-dialog button {
  font-size: 70%;
}

.CodeMirror-search-label {
  color: white;
}
.CodeMirror-search-hint {
  display: none;
}
`;
