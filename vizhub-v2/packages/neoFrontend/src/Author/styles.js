import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link)`
  display: flex;
  flex: 1;
  align-items: center;
  color: currentcolor;
`;

export const AuthorAvatar = styled.div`
  width: ${(props) => (props.isSmall ? 20 : 40)}px;
  margin-right: ${(props) => (props.isSmall ? 6 : 10)}px;
`;

export const AuthorName = styled.div`
  font-size: ${(props) => (props.isSmall ? 11 : 16)}px;
  font-weight: 600;
`;
