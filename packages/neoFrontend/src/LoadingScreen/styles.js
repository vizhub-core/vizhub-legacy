import styled, { keyframes } from 'styled-components';

export const LoadingScreenWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  opacity: 0;
  transition: opacity 2s;
`;

const spin = keyframes`
  from { transform: scale(0.25); }
  to { transform: scale(1); }
`;

export const SpinningLogo = styled.div`
  animation: ${spin} infinite 20s linear;
  width: 100vmin;
`;

export const Message = styled.div`
  position: absolute;
  text-align: center;
  bottom: 0;
  height: 20%;
`;
