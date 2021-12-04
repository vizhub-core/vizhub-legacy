import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 2px;
  height: ${props => props.height}px;
  background: aqua;
  pointer-events: none;
`;
