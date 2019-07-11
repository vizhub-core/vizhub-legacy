import styled from 'styled-components';

export const Wrapper = styled.img`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  box-shadow: ${props => props.theme.shadow};
  border: solid 1px ${props => props.borderColor};
  box-sizing: border-box;
  border-radius: 20px;
  user-select: none;
  cursor: pointer;
`;
