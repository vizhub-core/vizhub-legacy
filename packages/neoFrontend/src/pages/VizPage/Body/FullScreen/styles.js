import styled from 'styled-components';
import { Footer } from '../styles';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  z-index: -2;
  opacity: 0;
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

// We may want to bring this back at some point.
// This animation fades out the overlay buttons.
// const fadeOut = keyframes`
//   from { opacity: 1; }
//   to { opacity: 0; }
// `;
//   animation: ${fadeOut} 0.5s linear;

export const FullScreenFooter = styled(Footer)`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.5s;
  &:hover {
    opacity: 1;
  }
  opacity: 0;
`;
