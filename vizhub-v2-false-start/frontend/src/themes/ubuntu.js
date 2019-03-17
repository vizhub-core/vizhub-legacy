const theme = {
  foreground: 'white',
  background: '#300a24',
  selection: '#b6b6b6',
  gutterBorder: 'none', //'1px solid #533d51',
  lineNumbers: '#fce94f',
  comment: '#34e2e2',
  atom: '#ad7fa8',
  property: '#87ffaf'
};
theme.keyword = {
  color: theme.comment,
  weight: 'bold'
};
theme.number = theme.foreground;
theme.operator = theme.foreground;

theme.textLight = theme.foreground;
theme.configuratorHeaderBackground = theme.background;
theme.sectionHeaderBackground = theme.background;
theme.sectionBodyBackground = theme.background;

export const ubuntu = theme;
