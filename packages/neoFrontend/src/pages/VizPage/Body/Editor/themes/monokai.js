const theme = {
  container: {
    color: '#fcfcfa',
    background: '#29252a'
  },
  selection: { background: '#b6b6b6' },
  lineNumbers: { color: '#5b595c' },
  atom: { color: '#ffd866' },
  property: { color: '#a9dc76' },
  keyword: {
    color: '#78dce8',
    fontStyle: 'italic'
  },
  definition: { color: '#ab9df2' }
};

theme.number = theme.definition;

theme.comment = {
  color: theme.lineNumbers.color,
  fontStyle: 'italic'
};

theme.gutter = Object.assign({}, theme.container, {
  borderRight: '1px solid rgba(255,255,255,0.1)'
});

theme.content = {
  caretColor: theme.container.color
};

theme.matchingBracket = {
  color: theme.container.color,
  outline: '1px solid #727072'
};

theme.textLight = theme.container.color;

export const monokai = theme;
