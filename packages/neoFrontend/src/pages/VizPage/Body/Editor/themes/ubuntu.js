const theme = {
  container: {
    color: 'white',
    background: '#2a031f'
  },
  selection: { background: '#b6b6b6' },
  lineNumbers: { color: '#fce94f' },
  comment: { color: '#34e2e2' },
  atom: { color: '#ad7fa8' },
  property: { color: '#87ffaf' }
};

theme.gutter = Object.assign({}, theme.container, {
  borderRight: '1px solid rgba(255,255,255,0.1)'
});

theme.content = {
  caretColor: theme.container.color
};

theme.matchingBracket = {
  color: theme.container.color,
  background: '#06989a'
};

theme.keyword = theme.comment;

theme.textLight = theme.container.color;

export const ubuntu = theme;
