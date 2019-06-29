import styled from 'styled-components';

export const Message = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
`;

export const Error = styled(Message)`
  font-size: 1em;
`;
