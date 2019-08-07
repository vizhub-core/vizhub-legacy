const theme = {
  container: {
    color: '#abb2bf',
    background: 'transparent'
  },
  selection: { background: '#b6b6b6' },
  lineNumbers: { color: '#5c6370' },
  comment: {
    color: '#5c6370',
    fontStyle: 'italic'
  },
  keyword: { color: '#c679de' },
  atom: { color: '#98c379' },
  property: { color: '#61afef' },
  number: { color: '#d19a66' },
  tag: { color: '#e06c75' },
  variable: { color: '#5bafef' },
  default: { color: 'white' }
};

theme.caretColor = 'white';

theme.gutter = Object.assign({}, theme.container, {
  borderRight: '1px solid rgba(255,255,255,0.1)'
});

theme.matchingBracket = {
  color: theme.container.color,
  borderBottom: `1px solid ${theme.property.color}`
};

theme.operator = theme.keyword;

theme.textLight = theme.container.color;

export const vizHub = theme;
