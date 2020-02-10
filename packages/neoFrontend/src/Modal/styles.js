import styled from 'styled-components';
import { Z_WAY_WAY_ABOVE } from '../styles';
import { LargeIcon } from '../pages/styles';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(22, 21, 20, 0.46);
  z-index: ${Z_WAY_WAY_ABOVE};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  flex: 1;
  max-width: 600px;
  border-radius: ${props => props.theme.borderRadiusLarge}px;
  background-color: white;
  padding: 30px;
  box-shadow: ${props => props.theme.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const CloseIcon = styled(LargeIcon)`
  position: absolute;
  top: 0;
  right: 0;
  border-top-right-radius: ${props => props.theme.borderRadiusLarge}px;
`;

export const Message = styled.div`
  padding-bottom: 30px;
`;
