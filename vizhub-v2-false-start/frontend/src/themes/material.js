const theme = {
  container: {
    color: '#f0ffff',
    background: '#232e36'
  },
  selection: { background: '#b6b6b6' },
  lineNumbers: { color: '#36454f' },
  comment: {
    color: '#546e7a',
    fontStyle: 'italic'
  },
  keyword: { color: '#c792ea' },
  atom: { color: '#c3e88d' },
  property: { color: '#82aaff' },
  number: { color: '#f78c6c' },
  content: { caretColor: '#ffcc00' }
};

theme.matchingBracket = Object.assign({}, theme.container, {
  outline: '1px solid #696227'
});

theme.gutter = Object.assign({}, theme.container, {
  borderRight: '1px solid rgba(255,255,255,0.1)'
});

theme.operator = theme.keyword;

theme.textLight = theme.container.color;

export const material = theme;
