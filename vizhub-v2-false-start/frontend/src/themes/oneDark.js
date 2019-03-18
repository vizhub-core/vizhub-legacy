const theme = {
  container: {
    color: '#abb2bf',
    background: '#22262b'
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
  number: { color: '#d19a66' }
};

theme.content = {
  caretColor: theme.container.color
};

theme.gutter = Object.assign({}, theme.container, {
  borderRight: '1px solid rgba(255,255,255,0.1)'
});

theme.matchingBracket = {
  borderBottom: `1px solid ${theme.property.color}`
};

theme.operator = theme.keyword;

theme.textLight = theme.container.color;

export const oneDark = theme;
