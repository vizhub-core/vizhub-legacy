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

const keys = {};
//const css = key => props => objectToCSS(props.theme.editor[key]);
const css = key => props => {
  keys[key] = true;
  let styleObject = props.theme.editor[key];
  if (!styleObject) {
    console.log(`Editor theme does not define key: "${key}"`);
    styleObject = props.theme.editor.default;
  }
  return objectToCSS(styleObject);
};

window.showKeys = () => console.log(JSON.stringify(Object.keys(keys)));

const fontVariantLigatures = props =>
  props.theme.editor.font.ligatures ? 'normal' : 'none';

const codePadding = 4;

export const CodeMirrorGlobalStyle = createGlobalStyle`
  ${CodeMirrorCSS}
  .CodeMirror {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-family: '${props => props.theme.editor.font.family}';
    font-size: ${props => props.theme.editor.font.size};
    font-variant-ligatures: ${fontVariantLigatures};
    line-height: 1.4;
  }
  .CodeMirror-lines { padding: ${codePadding - 3}px 0 ${codePadding - 3}px 0; }
  .CodeMirror pre { padding: 0 ${codePadding}px 0 ${codePadding}px; }
  .CodeMirror { ${css('container')} }
  .CodeMirror-gutters { ${css('gutters')} }
  .CodeMirror-gutter { ${css('gutter')} }
  .CodeMirror-linenumber { ${css('lineNumbers')} }
  .CodeMirror-matchingbracket { ${css('matchingBracket')} }
  .CodeMirror-cursor {
    border-left: 1px solid ${props => props.theme.editor.caretColor};
    border-right: none;
    width: 0;
  }
  .cm-fat-cursor .CodeMirror-cursor, .cm-animate-fat-cursor{ ${css(
    'fatCursor'
  )} }
  .CodeMirror-selected  {
    background-color: ${props =>
      props.theme.editor.selectionBackground} !important;
  }
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
