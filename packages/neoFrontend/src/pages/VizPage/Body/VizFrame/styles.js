import styled from 'styled-components';
import { Z_ABOVE, Z_BELOW } from '../../../../styles';

export const Wrapper = styled.div`
  max-width: 960px;
  background-color: #ffffff;
  border-radius: 0 0 3px 3px;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  z-index: ${Z_BELOW};
  box-shadow: ${props => props.theme.shadowLight};
  height: 500px;
`;

export const Footer = styled.div`
  z-index: ${Z_ABOVE};
  box-shadow: ${props => props.theme.shadow};
  height: 40px;
`;
