import { theme as defaultTheme } from './defaultTheme';

export const theme = {
  ...defaultTheme,
  bannerBackground: '#000000',
  bannerHeight: 80,
  bannerMarginBottom: 28,
  navbarLogoColor: '#ffffff',
  navbarHeight: 32,
  avatarHeight: 40,
  navLinkFontSize: defaultTheme.text.medium,
  navLinkGapSize: 30,
};

export const darkNavbarTheme = {
  ...theme,
  bannerHeight: theme.bannerHeight / 2,
  bannerHeightMobile: 40,
  bannerPadding: 10,
  bannerMarginBottom: 0,
  navbarHeight: 20,
  avatarHeight: 20,
  navLinkFontSize: defaultTheme.text.small,
  navLinkGapSize: 20,
};
