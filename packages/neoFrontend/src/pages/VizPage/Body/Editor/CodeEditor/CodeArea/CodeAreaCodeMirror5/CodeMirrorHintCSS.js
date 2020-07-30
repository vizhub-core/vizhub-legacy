import {
  defaultCodingFontFamily,
  defaultCodingFontSize,
} from '../../../../../../../theme/defaultTheme';

// Derived from node_modules/codemirror/addon/hint/show-hint.css
export const CodeMirrorHintCSS = `
.CodeMirror-hints {
  background-color: #3d4b65;
  position: absolute;
  z-index: 10;
  overflow: hidden;
  list-style: none;

  margin: 0;
  padding: 0;

  font-family: ${defaultCodingFontFamily};
  font-size: ${defaultCodingFontSize};
  line-height: 1.4;

  max-height: 20em;
  overflow-y: auto;

  color: white;
}

.CodeMirror-hint {
  margin: 0;
  padding: 0 6px;
  white-space: pre;
  background-color: #3d4b65
  cursor: pointer;
}

li.CodeMirror-hint-active {
  background-color: #5b677d;
}
`;
