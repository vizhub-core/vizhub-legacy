import styled, { keyframes } from 'styled-components';

export const LoadingScreenWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 1s;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Spinning = styled.div`
  display: flex;
  animation: ${spin} infinite 3s linear;
`;

export const Message = styled.div`
  position: absolute;
  text-align: center;
  bottom: 0;
  height: 25%;
`;
