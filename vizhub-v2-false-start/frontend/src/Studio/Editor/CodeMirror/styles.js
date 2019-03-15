import styled, { createGlobalStyle } from 'styled-components';
import { mono } from '../../../styles.js';

export const Wrapper = styled.div`
  flex: 1;
  background-color: ${props => props.theme.background};
  cursor: text;
`;

export const CodeMirrorGlobalStyle = createGlobalStyle`
  .codemirror {
    font-family: '${mono.family}';
    line-height: 1.1;
    font-size: 24pt;
  }
  .codemirror, .codemirror-gutter {
    background-color: ${props => props.theme.background};
  }
  .codemirror ::selection {
    background-color: ${props => props.theme.selection};
  }
  .codemirror-gutter {
    border-right: ${props => props.theme.gutterBorder};
  }
  .codemirror-gutter-element {
    color: red !important;
  }
  .codemirror-content {
    caret-color: ${props => props.theme.foreground};
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
