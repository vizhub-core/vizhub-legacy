import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const AvatarOverlay = styled.div`
  position: absolute;
  top: 0px;
  width: 40px;
  height: 40px;
  border: solid 1px ${props => props.theme.dark};
  border-radius: 20px;
  background-color: rgba(246, 238, 227, 0.83);
  pointer-events: none;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Menu = styled.div`
  position: absolute;
  top: 46px;
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
  &:hover {
    text-decoration: underline;
  }
  padding: 4px 10px 4px 10px;
`;

export const HorizontalRule = styled.div`
  height: 1px;
  background-color: #dddddd;
`;
