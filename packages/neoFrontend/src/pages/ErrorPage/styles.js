import styled from 'styled-components';

export const Message = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.attentionGrabber};
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
`;
