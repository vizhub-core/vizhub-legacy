import styled from 'styled-components';

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
  padding: 4px 0 3px 0;
`;

export const Item = styled.div`
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  padding: 4px 10px 4px 10px;
  color: ${props => props.theme.dark};
  &:hover {
    text-decoration: underline;
  }
`;

export const HorizontalRule = styled.div`
  height: 1px;
  background-color: #dddddd;
`;
