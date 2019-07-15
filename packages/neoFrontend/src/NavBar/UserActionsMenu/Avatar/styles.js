import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  border-radius: 20px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  box-shadow: ${props => props.theme.shadow + (
    props.borderColor ? `, inset 0 0 0 1px ${props.borderColor};` : ''
  )};
  border-radius: 20px;
  user-select: none;
  cursor: pointer;
  background: url(${props => props.url});
  background-size: ${props => props.size}px;
`;
