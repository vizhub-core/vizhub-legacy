import { cubehelix } from 'd3-color';
const entries = [
  ['string', 'string2'],
  'keyword',
  'tag',
  ['definition', 'variable', 'variable2', 'variable3'],
  'atom',
  'qualifier',
  ['link', 'attribute', 'property'],
  'meta'
];
const theme = {
  container: {
    color: '#fff',
    background: 'rgba(0,0,0,0.1)'
    //background: 'transparent'
  },
  //selection: { background: '#b6b6b6' },
  selectionBackground: 'rgba(0,0,0,0.3)',
  lineNumbers: { color: '#5c6370' },
  //keyword: { color: '#c679de' },
  //atom: { color: '#98c379' },
  //property: { color: '#61afef' },
  //number: { color: '#d19a66' },
  comment: { color: '#ddd' },
  //meta: { color: '#ddd' },
  //variable: { color: '#5bafef' },
  operator: { color: '#ffffff' },
  number: { color: '#eee' },
  default: { color: '#ffffff' }
};

entries.forEach((entry, i) => {
  const t = (i / (entries.length + 1) + 0.35) % 1;
  const color = cubehelix(t * 360, 2, 0.82);
  const keys = typeof entry === 'string' ? [entry] : entry;
  keys.forEach(key => {
    theme[key] = { color: color.formatHex() };
    if (key === 'link') {
      theme[key].textDecoration = 'none';
    }
  });
});

theme.caretColor = 'white';

theme.gutter = Object.assign({}, theme.container, {
  borderRight: '1px solid rgba(255,255,255,0.1)'
});

theme.matchingBracket = {
  color: theme.container.color,
  borderBottom: `1px solid ${theme.property.color}`
};

export const vizHub = theme;
