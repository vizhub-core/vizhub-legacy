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

//const css = key => props => objectToCSS(props.theme.editor[key]);
const css = key => props => {
  let styleObject = props.theme.editor[key];
  if(!styleObject){
    console.log(`Editor theme does not define key: "${key}"`);
  styleObject = props.theme.editor.default;
  }
  return objectToCSS(styleObject);
};

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
  .CodeMirror-cursor{border-left:1px solid ${props => props.theme.editor.caretColor};border-right:none;width:0}
  .cm-s-default .cm-tag { ${css('tag')} }
  .cm-s-default .cm-link { ${css('link')} }
  .cm-s-default .cm-string { ${css('string')} }
  .cm-s-default .cm-string-2 { ${css('string2')} }
  .cm-s-default .cm-attribute { ${css('attribute')} }
  .cm-s-default .cm-meta { ${css('meta')} }
  .cm-s-default .cm-keyword, .cm-attribute { ${css('keyword')} }
  .cm-s-default .cm-comment { ${css('comment')} }
  .cm-s-default .cm-atom { ${css('atom')} }
  .cm-s-default .cm-number { ${css('number')} }
  .cm-s-default .cm-operator { ${css('operator')} }
  .cm-s-default .cm-property { ${css('property')} }
  .cm-s-default .cm-variable { ${css('variable')} }
  .cm-s-default .cm-variable-2 { ${css('variable2')} }
  .cm-s-default .cm-variable-3 { ${css('variable3')} }
  .cm-s-default .cm-def { ${css('definition')} }
  .cm-s-default .cm-qualifier { ${css('qualifier')} }
`;
