import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { showNeoNavBar } from '../featureFlags';
import {
  theme as defaultTheme,
  darkNavbarTheme as defaultDrkNavbarTheme,
} from './defaultTheme';
import {
  theme as neoTheme,
  darkNavbarTheme as neoDarkNavbarTheme,
} from './neoTheme';

export const theme = showNeoNavBar ? neoTheme : defaultTheme;

export const darkNavbarTheme = showNeoNavBar
  ? neoDarkNavbarTheme
  : defaultDrkNavbarTheme;

const Wrapper = styled.div`
  color: ${(props) => props.theme.dark};
`;

export const Themed = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>{children}</Wrapper>
  </ThemeProvider>
);
