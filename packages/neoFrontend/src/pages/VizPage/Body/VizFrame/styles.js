import styled from 'styled-components';
import { Footer } from '../styles';

// Use a new stacking context in order to
//  - Have the shadow from the footer cast onto the VizContent, and
//  - also have the VizContent interactive (exposed to pointer events).
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VizFrameFooter = styled(Footer)`
  border-radius: 0 0 3px 3px;
`;
