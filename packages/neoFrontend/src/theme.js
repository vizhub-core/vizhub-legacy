import React from 'react';
import { cubehelix } from 'd3-color';
import styled, { ThemeProvider } from 'styled-components';

export const defaultCodingFontFamily =
  'Ubuntu Mono,SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace';
export const defaultCodingFontSize = '16px';

export const theme = {
  buttonHeight: '40px',
  background: '#f6eee3',
  dark: '#161514',
  lightText: '#797979',
  lightBorder: '#E6E6E6',
  attentionGrabber: '#f0353d',
  shadow: '0 1px 4px 0 rgba(0, 0, 0, 0.15)',
  shadowLight: '0 1px 3px 0 rgba(0, 0, 0, 0.15)',
  bannerBackground: '#000000',
  bannerHeight: 80,
  bannerPadding: 6,
  navbarLogoColor: '#ffffff',
  navbarHeight: 45,
  headHeight: 30,
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
  bannerHeight: theme.bannerHeight / 2,
  bannerPadding: 20,
  navbarAvatarBorderColor: '#ffffff',
  navbarLogoColor: '#ffffff',
  navbarHeight: 20,
};

const Wrapper = styled.div`
  color: ${(props) => props.theme.dark};
`;

export const Themed = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>{children}</Wrapper>
  </ThemeProvider>
);
