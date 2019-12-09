// Common styles used in multiple components and pages.
import styled from 'styled-components';
import { isMobile } from './mobileMods';

export const Banner = styled.div`
  min-height: ${props =>
    isMobile ? props.theme.bannerHeightMobile : props.theme.bannerHeight}px;
  padding-left: ${props => props.theme.bannerPadding}px;
  padding-right: ${props => props.theme.bannerPadding}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.bannerBackground};
`;

export const Clickable = styled.div`
  &:hover {
    background-color: ${props => props.theme.hoverBackground};
  }
  &:active {
    background-color: ${props => props.theme.activeBackground};
  }
  cursor: pointer;
  user-select: none;
`;

// Values used for z-index.
export const Z_WAY_WAY_ABOVE = 3;
export const Z_WAY_ABOVE = 2;
export const Z_ABOVE = 1;
export const Z_BELOW = -1;

// This values is used only to create a new stacking context.
// See https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
export const Z_NEW_STACKING_CONTEXT = 0;
