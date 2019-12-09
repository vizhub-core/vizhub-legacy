import styled from 'styled-components';
import { Z_WAY_WAY_ABOVE, Clickable } from '../../../../styles';

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
  border-radius: 6px;
  background-color: white;
  margin: 10px 10px 10px 10px;
  padding: 30px 10px 40px 10px;
  box-shadow: ${props => props.theme.shadow};
  display: flex;
  justify-content: center;
`;
