import styled from 'styled-components';
import { Clickable } from '../../styles';

export const Wrapper = styled.div`
  position: relative;
  height: ${props => props.height}px;
`;

export const AvatarOverlay = styled.div`
  position: absolute;
  top: 0px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  box-sizing: border-box;
  border-radius: 20px;
  border: solid 1px ${props => props.theme.userMenuOverlayForeground};
  background-color: ${props => props.theme.userMenuOverlayBackground};
  &:hover {
    background-color: ${props => props.theme.userMenuOverlayBackgroundHover};
  }
  &:active {
    background-color: ${props => props.theme.userMenuOverlayBackgroundActive};
  }
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

export const Menu = styled.div`
  position: absolute;
  top: ${props => props.height + 6}px;
  right: 0;

  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  background-color: #ffffff;

  font-size: 12px;
  text-align: right;
`;

export const Item = styled(Clickable)`
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  padding: ${props => `
    ${props.topmost ? 8 : 4}px
    10px
    ${props.bottommost ? 7 : 4}px
    10px
  `}
  color: ${props => props.theme.dark};
`;

export const HorizontalRule = styled.div`
  height: 1px;
  background-color: #dddddd;
`;
