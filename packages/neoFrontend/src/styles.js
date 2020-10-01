// Common styles used in multiple components and pages.
import styled from 'styled-components';

// https://stackoverflow.com/questions/47836390/how-to-convert-a-camel-case-string-to-dashes-in-javascript
const dashed = (camel) => camel.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());

// TODO: make it shared
const objectToCSS = (object) =>
  object
    ? Object.entries(object)
        .map(([key, value]) => `${dashed(key)}:${value};`)
        .join('')
    : '';

// Values used for z-index.
export const Z_WAY_WAY_ABOVE = 3;
export const Z_WAY_ABOVE = 2;
export const Z_ABOVE = 1;
export const Z_BELOW = -1;

// This values is used only to create a new stacking context.
// See https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
export const Z_NEW_STACKING_CONTEXT = 0;

const hover = (props) =>
  props.isDisabled ? 'transparent' : props.theme.hoverBackground;
const active = (props) =>
  props.isDisabled ? 'transparent' : props.theme.activeBackground;
export const Clickable = styled.div`
  &:hover {
    background-color: ${hover};
  }
  &:active {
    background-color: ${active};
  }
  &.active {
    background-color: ${active};
  }
  ${(props) => (props.isDisabled ? '' : 'cursor: pointer;')}
  user-select: none;
`;

export const Footer = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #ffffff;
`;

export const HorizontalRule = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.rule};
`;

export const Flex = styled.div`
  display: flex;
  ${(
    // need to ignore children
    // eslint-disable-next-line no-unused-vars
    { children, theme, ...props }
  ) => objectToCSS(props)}
`;
