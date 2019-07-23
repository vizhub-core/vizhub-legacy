import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  right: 10px;
  bottom: 20px;
  width: ${props => props.theme.miniWidth}px;

  display: flex;
  flex-direction: column;
`;
