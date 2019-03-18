import styled, { createGlobalStyle } from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  background-color: ${props => props.theme.background};
  cursor: text;
`;

const color = key => ({ theme }) => `color: ${theme[key].color || theme[key]}`;
const style = key => ({ theme }) =>
  `font-style: ${theme[key].style || 'normal'}`;
const weight = key => ({ theme }) =>
  `font-weight: ${theme[key].weight || 'normal'}`;

// TODO bring this back if/when CodeMirror issue is resolved.
// https://github.com/codemirror/codemirror.next/issues/89
//const lineHeight = ({theme}) => {
//  // Use startsWith to handle arrowized variants as well.
//  if (theme.font.family.startsWith('Ubuntu Mono')) {
//    return 1.1;
//  }
//  return 1.4;
//}

export const CodeMirrorGlobalStyle = createGlobalStyle`
  .codemirror {
    font-family: '${props => props.theme.font.family}';
    font-size: ${props => props.theme.font.size};
    font-variant-ligatures: ${props =>
      props.theme.font.ligatures ? 'normal' : 'none'};
    line-height: 1.2;
  }
  .codemirror, .codemirror-gutter {
    background-${color('background')};
  }
  .codemirror ::selection {
    background-${color('selection')};
  }
  .codemirror-gutter {
    border-right: ${props => props.theme.gutterBorder};
  }
  .codemirror-gutter-element {
    ${color('lineNumbers')} !important;
  }
  .codemirror-content {
    caret-${color('foreground')};
  }

  .codemirror-matching-bracket {
    ${props => props.theme.matchingBracket}
  }

  .cm-keyword,
  .cm-attribute {
    ${color('keyword')};
    ${weight('keyword')};
  }

  .cm-comment {
    ${color('comment')};
    ${style('comment')};
  }

  .cm-atom,
  .cm-string,
  .cm-string-2,
  .cm-qualifier {
    ${color('atom')};
  }

  .cm-number {
    ${color('number')};
  }

  .cm-operator {
    ${color('operator')};
  }

  .cm-property {
    ${color('property')};
  }
`;
