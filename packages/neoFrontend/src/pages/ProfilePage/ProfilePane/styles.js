import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  color: currentcolor;
`;

export const AuthorAvatar = styled.div`
  width: ${(props) => (props.isSmall ? 80 : 120)}px;
  margin-right: ${(props) => (props.isSmall ? 20 : 40)}px;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: left;
  color: currentcolor;
`;


export const AuthorName = styled.div`
  font-size: ${(props) => (props.isSmall ? 22 : 24)}px;
  font-weight: 600;
`;

export const AuthorUserName = styled.div`
  color: ${(props) => props.theme.lightText};
  font-size: ${(props) => (props.isSmall ? 16 : 20)}px;
  font-weight: 600;
`;
