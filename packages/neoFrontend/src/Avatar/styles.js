import styled from 'styled-components';
import { Clickable, Z_NEW_STACKING_CONTEXT, Z_ABOVE, Z_BELOW } from '../styles';

export const Wrapper = styled.div`
  position: relative;
  z-index: ${Z_NEW_STACKING_CONTEXT};
`;

// It was quite tricky to get this inner border to appear above the image.
// References:
// https://designshack.net/articles/css/inner-shadows-in-css-images-text-and-beyond/
// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
export const InnerBorder = styled(Clickable)`
  display: flex;
  box-shadow: ${(props) =>
    props.borderColor ? `inset 0 0 0 1px ${props.borderColor};` : 'none'};
  z-index: ${Z_ABOVE};
  border-radius: ${(props) => props.size / 2}px;
`;

export const Image = styled.img`
  box-shadow: ${(props) => props.theme.shadow};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  z-index: ${Z_BELOW};
`;
