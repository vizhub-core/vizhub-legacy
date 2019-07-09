import styled from 'styled-components';

export const AvatarWrapper = styled.div`
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
`;
