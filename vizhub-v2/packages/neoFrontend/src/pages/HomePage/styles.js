import styled, { createGlobalStyle } from 'styled-components';

export const HtmlStylesOverride = createGlobalStyle`
  html {
    overflow-y: scroll;
  }
`;

export const WideContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
`;
