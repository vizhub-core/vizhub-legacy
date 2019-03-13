import styled, { createGlobalStyle } from 'styled-components';
import { mono } from '../../../styles.js';

export const Wrapper = styled.div`
  flex: 1;
  background-color: #300a24;
  cursor: text;
`;

export const CodeMirrorGlobalStyle = createGlobalStyle`
  .codemirror {
    font-family: '${mono.family}';
    line-height: 1.1;
    font-size: 24pt;
  }
  .codemirror, .codemirror-gutter {
    background-color: #300a24;
  }
  .codemirror ::selection {
    background-color: #b6b6b6;
  }
  .codemirror-gutter {
    border-right: 1px solid #533d51;
  }
  .codemirror-gutter-element {
    color: #fce94f;
  }
  .codemirror-content {
    caret-color: white;
  }

  .cm-keyword,
  .cm-comment,
  .cm-bracket,
  .cm-attribute,
  .codemirror-matchingbracket {
    color: #34e2e2; /* neon blue */
  }

  .cm-atom,
  .cm-string,
  .cm-string-2,
  .cm-qualifier {
    color: #ad7fa8; /* purple */
  }

  .cm-property {
    color: #87ffaf; /* pale green */
  }
`;
