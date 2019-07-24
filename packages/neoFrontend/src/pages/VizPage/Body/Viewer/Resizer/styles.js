import styled from 'styled-components';
import { Z_ABOVE } from '../../../../../styles';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 15px;
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

  width: 0px;
  ${Wrapper}:hover & {
    width: 20px;
  }
  transition: width ${props => props.theme.fastTransition};
  background-color: ${props => props.theme.activeBackground};
`;
