// Common styles used in multiple components and pages.
import styled from 'styled-components';

export const Banner = styled.div`
  min-height: ${props => props.theme.bannerHeight}px;
  padding-left: ${props => props.theme.bannerPadding}px;
  padding-right: ${props => props.theme.bannerPadding}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.bannerBackground};
`;
