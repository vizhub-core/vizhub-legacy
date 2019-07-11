// Common styles used in multiple components and pages.
import styled from 'styled-components';

export const Banner = styled.div`
  min-height: ${props => props.theme.bannerHeight};
  padding-left: 6px;
  padding-right: 6px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.bannerBackground};
`;
