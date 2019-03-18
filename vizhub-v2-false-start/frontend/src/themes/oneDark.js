// Inspired by https://github.com/Aerobird98/codemirror-one-dark-theme/blob/master/one-dark.css
const theme = {
  foreground: '#abb2bf',
  background: '#22262b',
  selection: '#b6b6b6',
  gutterBorder: '1px solid #533d51',
  lineNumbers: '#5c6370',
  keyword: '#c679de',
  atom: '#98c379',
  property: '#61afef',
  number: '#d19a66',
  comment: {
    color: '#5c6370',
    style: 'italic'
  }
};

theme.matchingBracket = `
  border-bottom: 1px solid ${theme.property};
`;

theme.operator = theme.keyword;

theme.textLight = theme.foreground;
theme.configuratorHeaderBackground = theme.background;
theme.sectionHeaderBackground = theme.background;
theme.sectionBodyBackground = theme.background;

export const oneDark = theme;
