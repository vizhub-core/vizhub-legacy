import styled, { createGlobalStyle } from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  background-color: ${props => props.theme.background};
  cursor: text;
`;

// https://stackoverflow.com/questions/47836390/how-to-convert-a-camel-case-string-to-dashes-in-javascript
const dashed = camel => camel.replace(/[A-Z]/g, m => '-' + m.toLowerCase());

const objectToCSS = object =>
  object
    ? Object.entries(object)
        .map(([key, value]) => `${dashed(key)}:${value};`)
        .join('')
    : '';

const css = key => props => objectToCSS(props.theme[key]);

// TODO bring this back if/when CodeMirror issue is resolved.
// https://github.com/codemirror/codemirror.next/issues/89
//const lineHeight = ({theme}) => {
//  // Use startsWith to handle arrowized variants as well.
//  if (theme.font.family.startsWith('Ubuntu Mono')) {
//    return 1.1;
//  }
//  return 1.4;
//}

const fontVariantLigatures = props =>
  props.theme.font.ligatures ? 'normal' : 'none';

export const CodeMirrorGlobalStyle = createGlobalStyle`
  .codemirror {
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
`;
