import styled from 'styled-components';
import { Z_BELOW } from '../../../../styles';

export const Wrapper = styled.div`
  position: fixed;
  background-color: pink;
  z-index: ${Z_BELOW};
`;
