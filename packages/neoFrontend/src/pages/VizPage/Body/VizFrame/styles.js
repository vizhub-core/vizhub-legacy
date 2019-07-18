import styled from 'styled-components';
import { Z_ABOVE, Z_BELOW } from '../../../../styles';
import { Footer } from '../styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  z-index: ${Z_BELOW};
  box-shadow: ${props => props.theme.shadowLight};
  height: ${props => props.height}px;
`;

export const VizFrameFooter = styled(Footer)`
  z-index: ${Z_ABOVE};
  border-radius: 0 0 3px 3px;
`;
