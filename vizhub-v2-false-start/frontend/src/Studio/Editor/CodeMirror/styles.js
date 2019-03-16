import styled, { createGlobalStyle } from 'styled-components';
import { mono } from '../../../styles.js';

export const Wrapper = styled.div`
  flex: 1;
  background-color: ${props => props.theme.background};
  cursor: text;
`;

const color = key => props => {
  const value = props.theme[key];
  return 'color: ' + (value.color || value);
};

export const CodeMirrorGlobalStyle = createGlobalStyle`
  .codemirror {
    font-family: '${mono.family}';
    line-height: ${mono.lineHeight};
    font-size: ${mono.size};
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
    color: ${props => props.theme.lineNumbers} !important;
  }
  .codemirror-content {
    caret-color: ${props => props.theme.foreground};
  }

  .cm-keyword,
  .cm-bracket,
  .cm-attribute,
  .codemirror-matchingbracket {
    color: ${props => props.theme.keyword};
  }

  .cm-comment {
    ${color('comment')};
  }

  .cm-atom,
  .cm-string,
  .cm-string-2,
  .cm-qualifier {
    color: ${props => props.theme.atom};
  }

  .cm-property {
    color: ${props => props.theme.property};
  }
`;
