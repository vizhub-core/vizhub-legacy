import styled from 'styled-components';
import { Z_ABOVE } from '../../../../styles';

export const Wrapper = styled.div`
  position: fixed;
  right: 25px;
  bottom: 10px;
  width: ${props => props.theme.miniWidth}px;

  display: flex;
  flex-direction: column;
  z-index: ${Z_ABOVE};
`;
