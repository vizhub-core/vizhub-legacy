import styled from 'styled-components';
import { Z_BELOW } from '../../../../styles';

export const Wrapper = styled.div`
  z-index: ${Z_BELOW};
  box-shadow: ${props => props.theme.shadowLight};
`;
