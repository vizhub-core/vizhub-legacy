import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

export const theme = {
  dark: '#161514',
  attentionGrabber: '#f0353d',
  shadow: '0 1px 4px 0 rgba(0, 0, 0, 0.15)',
  shadowLight: '0 1px 3px 0 rgba(0, 0, 0, 0.15)',
  bannerBackground: 'transparent',
  bannerHeight: 100,
  bannerPadding: 6,
  navbarLogoColor: 'currentcolor',
  navbarItemHeight: 40,
  userMenuOverlayBackground: 'rgba(246, 238, 227, 0.83)',
  userMenuOverlayBackgroundHover: 'rgba(246, 238, 227, 0.7)',
  userMenuOverlayBackgroundActive: 'rgba(246, 238, 227, 0.5)',
  iconHoverBackground: 'rgba(0, 0, 0, 0.05)',
  iconActiveBackground: 'rgba(0, 0, 0, 0.10)',
  defaultCodingFontFamily: 'Ubuntu Mono Arrowized'
};
theme.userMenuOverlayForeground = theme.dark;

export const darkNavbarTheme = {
  ...theme,
  bannerBackground: theme.dark,
  bannerHeight: 40,
  bannerPadding: 20,
  navbarLogoColor: '#ffffff',
  navbarItemHeight: 20,
  navbarAvatarBorderColor: '#ffffff',
  userMenuOverlayBackground: 'rgba(0, 0, 0, 0.5)',
  userMenuOverlayBackgroundHover: 'rgba(0, 0, 0, 0.4)',
  userMenuOverlayBackgroundActive: 'rgba(0, 0, 0, 0.3)',
  userMenuOverlayForeground: '#ffffff',
  editorSectionActiveColor: 'rgba(255, 255, 255, 0.15)',
  editorFileActiveColor: '#ffffff',
  editorEntryVerticalPadding: 5,
  editorEntryHorizontalPadding: 15,
  editorEntryIndentation: 10,
  editorEntryLeftBorderSize: 5
};

const Wrapper = styled.div`
  color: ${props => props.theme.dark};
`;

export const Themed = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>{children}</Wrapper>
  </ThemeProvider>
);
