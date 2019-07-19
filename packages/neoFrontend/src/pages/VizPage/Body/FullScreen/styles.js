import styled, { keyframes } from 'styled-components';
import { Footer } from '../styles';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const FullScreenFooter = styled(Footer)`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.5s;
  &:hover {
    opacity: 1;
  }
  animation: ${fadeOut} 0.5s linear;
  opacity: 0;
`;
