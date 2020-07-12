import { 
  theme as defaultTheme,
} from './defaulTheme';

export const theme = {
  ...defaultTheme,
  bannerBackground: '#000000',
  bannerHeight: 80,
  navbarLogoColor: '#ffffff',
  navbarHeight: 32,
  avatarHeight: 45,
};

export const darkNavbarTheme = {
  ...theme,
  bannerHeight: theme.bannerHeight / 2,
  bannerPadding: 20,
  navbarHeight: 20,
  avatarHeight: 20,
};
