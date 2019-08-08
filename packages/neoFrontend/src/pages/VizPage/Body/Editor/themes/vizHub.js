import { hcl } from 'd3-color';
const entries = [
  'keyword',
  'tag',
  ['definition', 'variable', 'variable2', 'variable3'],
  'qualifier',
  ['string', 'string2'],
  ['atom', 'number'],
  ['link', 'attribute', 'property']
];

const sidebarBackground = { h: 269.346, c: 17.195, l: 31.512 };
const backgroundLuminance = 8;

const luminance = 93;
const saturation = 75;
const light = hcl(0, 0, luminance).formatHex();
const dark = hcl(sidebarBackground.h, sidebarBackground.c, 78).formatHex();

export const vizHub = rotation => {
  const theme = {
    container: {
      color: light,
      backgroundColor: hcl(
        sidebarBackground.h,
        sidebarBackground.c * 0.8,
        backgroundLuminance
      ).formatHex()
    },
    headerBackgroundColor: hcl(
      sidebarBackground.h,
      sidebarBackground.c * 0.8,
      (backgroundLuminance + sidebarBackground.l) / 2
    ).formatHex(),
    selectionBackground: 'rgba(0,0,0,0.5)',
    lineNumbers: { color: '#5c6370' },
    //keyword: { color: '#c679de' },
    //atom: { color: '#98c379' },
    //property: { color: '#61afef' },
    //number: { color: '#d19a66' },
    comment: { color: dark },
    meta: { color: dark },
    //variable: { color: '#5bafef' },
    operator: { color: light },
    //number: { color: light },
    default: { color: light }
  };

  theme.colors = entries.map((entry, i) => {
    const t = ((i + 0) / entries.length + rotation) % 1;
    const color = hcl(t * 360, saturation, luminance).formatHex();
    const keys = typeof entry === 'string' ? [entry] : entry;
    keys.forEach(key => {
      theme[key] = { color };
      if (key === 'link') {
        theme[key].textDecoration = 'none';
      }
    });
    return color;
  });
  theme.colors = theme.colors.concat(theme.colors[0]);

  theme.caretColor = 'white';

  theme.gutter = Object.assign({}, theme.container, {
    borderRight: '1px solid rgba(255,255,255,0.1)'
  });

  theme.matchingBracket = {
    color: theme.container.color,
    borderBottom: `1px solid ${theme.property.color}`
  };

  return theme;
};
