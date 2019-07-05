import styled, { keyframes } from 'styled-components';

export const LoadingScreenWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const spin = keyframes`
  from { transform: rotate(-10deg) scale(0.5); }
  to { transform: rotate(360deg) scale(2); }
`;

export const SpinningLogo = styled.div`
  animation: ${spin} infinite 20s linear;
  width: 100vmin;
`;
