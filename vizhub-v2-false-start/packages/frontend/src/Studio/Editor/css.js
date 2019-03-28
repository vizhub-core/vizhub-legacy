// https://stackoverflow.com/questions/47836390/how-to-convert-a-camel-case-string-to-dashes-in-javascript
const dashed = camel => camel.replace(/[A-Z]/g, m => '-' + m.toLowerCase());

const objectToCSS = object =>
  object
    ? Object.entries(object)
        .map(([key, value]) => `${dashed(key)}:${value};`)
        .join('')
    : '';

export const css = key => props => objectToCSS(props.theme[key]);
