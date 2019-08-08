import { hcl } from 'd3-color';
const entries = [
  'keyword',
  ['tag', 'variable', 'variable2', 'variable3', 'definition'],
  'qualifier',
  ['string', 'string2'],
  ['atom', 'number'],
  ['link', 'attribute', 'property']
];

const lightEntries = ['operator'];

const sidebarDark = hcl('#3d4b65');
const sidebarLight = hcl('#5b677d');

const luminaceDifference = sidebarLight.l - sidebarDark.l;

const backgroundLuminance = sidebarDark.l - luminaceDifference * 1.5;

const luminance = 90;

// The luminance difference between background and foreground
// measured in the OneDark Pro VSCode theme.
// const oneDarkContrast = 62;

// Use this to check luminance difference (contrast).
//console.log(luminance - backgroundLuminance);

const saturation = 70;
const light = hcl(0, 0, luminance).formatHex();
const dark = hcl(sidebarDark.h, sidebarDark.c, 80).formatHex();

export const vizHub = rotation => {
  const theme = {
    container: {
      color: light,
      backgroundColor: hcl(
        sidebarDark.h,
        sidebarDark.c,
        backgroundLuminance
      ).formatHex()
    },
    headerBackgroundColor: hcl(
      sidebarDark.h,
      sidebarDark.c,
      (backgroundLuminance + sidebarDark.l) / 2
    ).formatHex(),
    selectionBackground: '#000',
    lineNumbers: { color: '#5c6370' },
    //keyword: { color: '#c679de' },
    //atom: { color: '#98c379' },
    //property: { color: '#61afef' },
    //number: { color: '#d19a66' },
    comment: { color: dark },
    meta: { color: dark },
    //variable: { color: '#5bafef' },
    //number: { color: light },
    fatCursor: { backgroundColor: light },
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

  lightEntries.forEach(key => {
    theme[key] = { color: light };
  });

  theme.colors.push(theme.colors[0]);
  theme.colors.push(light);

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
