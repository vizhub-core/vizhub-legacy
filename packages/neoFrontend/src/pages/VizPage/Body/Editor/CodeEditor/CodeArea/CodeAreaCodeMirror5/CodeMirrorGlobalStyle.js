import { createGlobalStyle } from 'styled-components';
import { CodeMirrorCSS } from './CodeMirrorCSS';

// https://stackoverflow.com/questions/47836390/how-to-convert-a-camel-case-string-to-dashes-in-javascript
const dashed = camel => camel.replace(/[A-Z]/g, m => '-' + m.toLowerCase());

const objectToCSS = object =>
  object
    ? Object.entries(object)
        .map(([key, value]) => `${dashed(key)}:${value};`)
        .join('')
    : '';

const css = key => props => objectToCSS(props.theme.editor[key]);

const fontVariantLigatures = props =>
  props.theme.editor.font.ligatures ? 'normal' : 'none';

export const CodeMirrorGlobalStyle = createGlobalStyle`
  ${CodeMirrorCSS}
  .CodeMirror {
    height: 100%;
    font-family: '${props => props.theme.editor.font.family}';
    font-size: ${props => props.theme.editor.font.size};
    font-variant-ligatures: ${fontVariantLigatures};
    line-height: 1.2;
  }
  .CodeMirror { ${css('container')} }
  .CodeMirror ::selection { ${css('selection')} }
  .CodeMirror-gutter { ${css('gutter')} }
  .CodeMirror-gutter-element { ${css('lineNumbers')} }
  .CodeMirror-content { ${css('content')} }
  .CodeMirror-matching-bracket { ${css('matchingBracket')} } 
  .cm-keyword, .cm-attribute { ${css('keyword')} }
  .cm-comment { ${css('comment')} }
  .cm-atom, .cm-string, .cm-string-2, .cm-qualifier { ${css('atom')} }
  .cm-number { ${css('number')} }
  .cm-operator { ${css('operator')} }
  .cm-property { ${css('property')} }
  .cm-variable { ${css('variable')} }
  .cm-def { ${css('definition')} }
`;
