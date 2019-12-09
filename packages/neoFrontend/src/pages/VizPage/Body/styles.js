import styled from 'styled-components';
import { Z_WAY_ABOVE } from '../../../styles';
import { Icon } from '../../styles';

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

export const LargeIcon = styled(Icon)`
  height: 40px;
  padding-right: ${props => (props.rightmost ? 10 : 7)}px;
  padding-left: ${props => (props.leftmost ? 10 : 7)}px;
`;

export const Footer = styled.div`
  box-shadow: ${props => props.theme.shadow};
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #ffffff;
`;

export const FrameFooter = styled(Footer)`
  border-radius: 0 0 3px 3px;
  position: relative;
  z-index: ${Z_WAY_ABOVE};
`;
