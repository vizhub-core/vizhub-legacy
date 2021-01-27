import { cubehelix } from 'd3-color';
import { text } from './text';

export const defaultCodingFontFamily =
  'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace';
export const defaultCodingFontSize = '16px';

export const theme = {
  text,
  buttonHeight: '40px',
  buttonHeightSmall: '30px',
  background: '#f6eee3',
  dark: '#161514',
  lightText: '#797979',
  lightBorder: '#E6E6E6',
  attentionGrabber: '#f0353d',
  shadow: '0 1px 4px 0 rgba(0, 0, 0, 0.15)',
  shadowLight: '0 1px 3px 0 rgba(0, 0, 0, 0.15)',
  bannerBackground: 'transparent',
  bannerHeight: 100,
  bannerHeightMobile: 52,
  bannerPadding: 6,
  navbarLogoColor: 'currentcolor',
  navbarHeight: 40,
  headHeight: 30,
  userMenuOverlayBackground: 'rgba(246, 238, 227, 0.83)',
  userMenuOverlayBackgroundHover: 'rgba(246, 238, 227, 0.7)',
  userMenuOverlayBackgroundActive: 'rgba(246, 238, 227, 0.5)',
  hoverBackground: 'rgba(0, 0, 0, 0.05)',
  activeBackground: 'rgba(0, 0, 0, 0.1)',
  hoverBackgroundInverted: 'rgba(255,255,255, 0.12)',
  activeBackgroundInverted: 'rgba(255,255,255, 0.24)',
  bottomButtonBackgroundActive: '#b3b6bc',

  defaultCodingFontFamily,
  defaultCodingFontSize,
  miniWidth: 268,
  fastTransition: '.2s ease-in-out',
  editorBackground: '#3d4b65',
  editorSectionActiveColor: '#5b677d',
  editorEntryHeight: 30,
  editorFileActiveColor: '#ffffff',
  editorEntryHorizontalPadding: 15,
  editorEntryIndentation: 10,
  editorEntryLeftBorderSize: 5,
  editorActiveLineBackground: 'rgba(222,234,255,0.15)',
  borderRadiusSmall: 3,
  borderRadiusMedium: 4,
  borderRadiusLarge: 6,
  veryLightPink: '#c0c0c0',
  rule: 'rgba(0, 0, 0, 0.12)',
  interactive: '#3866E9',
};
theme.userMenuOverlayForeground = theme.dark;
theme.bottomButtonBackground = theme.editorSectionActiveColor;

const blue = cubehelix('#3866e9');
theme.blue = blue.formatHex();

blue.l -= 0.1;
theme.blueHoverFilled = blue.formatHex();
blue.l -= 0.1;
theme.blueActiveFilled = blue.formatHex();

blue.l = 0.95;
theme.blueHover = blue.formatHex();
blue.l = 0.9;
theme.blueActive = blue.formatHex();

// Old red from Alec's designs.
//const red = cubehelix('#f0353d');

// New red from Sam's designs.
const red = cubehelix('#ff006b');
theme.red = red.formatHex();

red.l -= 0.1;
theme.redHoverFilled = red.formatHex();
red.l -= 0.1;
theme.redActiveFilled = red.formatHex();

red.l = 0.95;
theme.redHover = red.formatHex();
red.l = 0.9;
theme.redActive = red.formatHex();

export const darkNavbarTheme = {
  ...theme,
  bannerBackground: theme.dark,
  bannerHeight: 40,
  bannerHeightMobile: 40,
  bannerPadding: 20,
  navbarAvatarBorderColor: '#ffffff',
  navbarLogoColor: '#ffffff',
  navbarHeight: 20,
  userMenuOverlayBackground: 'rgba(0, 0, 0, 0.5)',
  userMenuOverlayBackgroundHover: 'rgba(0, 0, 0, 0.4)',
  userMenuOverlayBackgroundActive: 'rgba(0, 0, 0, 0.3)',
  userMenuOverlayForeground: '#ffffff',
};
