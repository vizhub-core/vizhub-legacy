import styled from 'styled-components';

export const SignIn = styled.div`
  color: ${props => props.theme.attentionGrabber};
  font-weight: bold;
  cursor: pointer;
  user-select: none;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  box-shadow: ${props => props.theme.shadow};
  border-radius: 20px;
`;
