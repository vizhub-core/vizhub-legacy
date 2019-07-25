import styled from 'styled-components';
import { Z_ABOVE } from '../../../../../styles';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 20px;
  &:hover {
    cursor: col-resize;
  }
  z-index: ${Z_ABOVE};
`;

export const Thumb = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 10px;
  ${Wrapper}:hover & {
    background-color: ${props => props.theme.hoverBackground};
  }
  ${Wrapper}:active & {
    background-color: ${props => props.theme.activeBackground};
  }
`;
