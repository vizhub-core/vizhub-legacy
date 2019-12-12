import styled from 'styled-components';
import { Z_WAY_ABOVE, Footer } from '../../../styles';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
`;

// Set z index, just so the shadow from the top
// can cast on top of the bottom content
// when it is scrolled.
export const Top = styled.div`
  z-index: ${Z_WAY_ABOVE};
`;

// Big WTF moment - here's why "min-height: 0" right here:
// https://moduscreate.com/blog/how-to-fix-overflow-issues-in-css-flex-layouts/
export const Bottom = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`;

export const FrameFooter = styled(Footer)`
  border-bottom-right-radius: ${props => props.theme.borderRadiusSmall}px;
  border-bottom-left-radius: ${props => props.theme.borderRadiusSmall}px;
  position: relative;
  z-index: ${Z_WAY_ABOVE};
`;
