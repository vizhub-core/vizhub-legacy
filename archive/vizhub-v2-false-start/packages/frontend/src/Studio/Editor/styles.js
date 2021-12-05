import styled, { createGlobalStyle } from 'styled-components';
import { css } from './css';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.background};
  cursor: text;
`;

const fontVariantLigatures = props =>
  props.theme.font.ligatures ? 'normal' : 'none';

export const CodeMirrorGlobalStyle = createGlobalStyle`
  .codemirror {
    width: 100%;
    height: 100%;
    overflow: auto;
    font-family: '${props => props.theme.font.family}';
    font-size: ${props => props.theme.font.size};
    font-variant-ligatures: ${fontVariantLigatures};
    line-height: 1.2;
  }
  .codemirror { ${css('container')} }
  .codemirror ::selection { ${css('selection')} }
  .codemirror-gutter { ${css('gutter')} }
  .codemirror-gutter-element { ${css('lineNumbers')} }
  .codemirror-content { ${css('content')} }
  .codemirror-matching-bracket { ${css('matchingBracket')} } 
  .cm-keyword, .cm-attribute { ${css('keyword')} }
  .cm-comment { ${css('comment')} }
  .cm-atom, .cm-string, .cm-string-2, .cm-qualifier { ${css('atom')} }
  .cm-number { ${css('number')} }
  .cm-operator { ${css('operator')} }
  .cm-property { ${css('property')} }
  .cm-variable { ${css('variable')} }
  .cm-def { ${css('definition')} }
`;

// TODO bring this back if/when CodeMirror issue is resolved.
// https://github.com/codemirror/codemirror.next/issues/89
//const lineHeight = ({theme}) => {
//  // Use startsWith to handle arrowized variants as well.
//  if (theme.font.family.startsWith('Ubuntu Mono')) {
//    return 1.1;
//  }
//  return 1.4;
//}
