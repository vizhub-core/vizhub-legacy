import styled, { createGlobalStyle } from 'styled-components';

export const HtmlStylesOverride = createGlobalStyle`
  html {
    overflow-y: scroll;
  }
`;

export const HorizontalSplit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;
