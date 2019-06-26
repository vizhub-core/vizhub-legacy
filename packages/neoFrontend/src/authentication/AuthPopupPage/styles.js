import styled from 'styled-components';

const Message = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Success = styled(Message)`
  font-size: 2em;
`;

export const Error = Message;
