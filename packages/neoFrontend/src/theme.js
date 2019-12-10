import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

// Monospace system font stack used by GitHub, August 2019.
const systemMonospaceStack =
  'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace';

export const fontFamily = (font, ligatures) =>
  font + (ligatures !== 'all' ? ' Arrowized' : '') + ',' + systemMonospaceStack;

export const defaultCodingFont = 'Ubuntu Mono';
export const defaultCodingLigatures = 'arrows';
export const defaultCodingFontFamily = fontFamily(
  defaultCodingFont,
  defaultCodingLigatures
);
export const defaultCodingFontSize = '16px';

export const theme = {
  background: '#f6eee3',
  dark: '#161514',
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
  //bottomButtonBackgroundActive: 'rgba(216, 216, 216, 0.75)',
  bottomButtonBackgroundActive: '#b3b6bc',
  //bottomButtonBackground: 'rgba(216, 216, 216, 0.22)',

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
  borderRadiusSmall: 3,
  borderRadiusLarge: 6
};
theme.userMenuOverlayForeground = theme.dark;
theme.bottomButtonBackground = theme.editorSectionActiveColor;

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
  userMenuOverlayForeground: '#ffffff'
  //editorBorder: '1px solid rgba(255, 255, 255, 0.4)'
};

const Wrapper = styled.div`
  color: ${props => props.theme.dark};
`;

export const Themed = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>{children}</Wrapper>
  </ThemeProvider>
);
