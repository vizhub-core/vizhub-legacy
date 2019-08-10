import styled, { keyframes } from 'styled-components';

export const LoadingScreenWrapper = styled.div`
  display: flex;
  ${props => (props.isChild ? `height: 100%;` : `height: 100vh;`)}
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${props => props.background};
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Spinning = styled.div`
  transition: opacity 1s;
  display: flex;
  animation: ${spin} infinite 3s linear;
`;

export const Message = styled.div`
  transition: opacity 1s;
  position: absolute;
  text-align: center;
  bottom: 0;
  height: 25%;
`;
