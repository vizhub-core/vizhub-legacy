// Derived from node_modules/codemirror/addon/dialog/dialog.css
export const CodeMirrorDialogCSS = `
.CodeMirror-dialog {
  position: absolute;
  display: flex;
  align-items: center;
  left: 0; right: 0;
  background: inherit;
  z-index: 15;
  padding-left: 10px;
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
  flex: 1;
  border: none;
  outline: none;
  background-color: inherit;
  color: white;
  font: inherit;
  padding-left: 5px;
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
