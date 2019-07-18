import styled from 'styled-components';
import { Z_ABOVE, Z_BELOW, Z_NEW_STACKING_CONTEXT } from '../../../../styles';
import { Footer } from '../styles';

// Use a new stacking context in order to
//  - Have the shadow from the footer cast onto the VizContent, and
//  - also have the VizContent interactive (exposed to pointer events).
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  z-index: ${Z_NEW_STACKING_CONTEXT};
`;

export const Content = styled.div`
  z-index: ${Z_BELOW};
  box-shadow: ${props => props.theme.shadowLight};
`;

export const VizFrameFooter = styled(Footer)`
  z-index: ${Z_ABOVE};
  border-radius: 0 0 3px 3px;
`;
