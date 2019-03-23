const theme = {
  container: {
    color: '#f8f8f2',
    background: '#282a36'
  },
  keyword: {
    color: '#ff79c6'
  },
  selection: { background: '#a8a8a8' },
  lineNumbers: { color: '#6272a4' },
  atom: { color: '#f1fa8c' },
  property: { color: '#50fa7b' }
};

theme.comment = theme.lineNumbers;

theme.gutter = Object.assign({}, theme.container, {
  borderRight: '1px solid rgba(255,255,255,0.1)'
});

theme.content = {
  caretColor: theme.container.color
};

theme.matchingBracket = {
  color: theme.container.color,
  outline: '1px solid #888888'
};

theme.textLight = theme.container.color;

export const dracula = theme;
