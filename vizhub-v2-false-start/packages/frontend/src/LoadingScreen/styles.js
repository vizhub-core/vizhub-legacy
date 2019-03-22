import styled, { keyframes } from 'styled-components';

export const LoadingScreenWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const spin = keyframes`
  from { transform: rotate(-10deg) scale(0.5); }
  to { transform: rotate(360deg) scale(2); }
`;

export const SpinningImage = styled.img`
  animation: ${spin} infinite 20s linear;
  height: 25vmin;
`;
