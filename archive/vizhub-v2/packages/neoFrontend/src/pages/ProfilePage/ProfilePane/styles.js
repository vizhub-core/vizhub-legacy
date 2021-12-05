import styled from 'styled-components';
import { isMobile } from '../../../mobileMods';

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  color: currentcolor;
  margin: ${isMobile ? '10px 6px 0 6px' : '0 6px 20px 6px'};
`;

export const AuthorAvatar = styled.div`
  margin-right: 20px;
  pointer-events: none;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: left;
  color: currentcolor;
`;

export const AuthorName = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

export const AuthorUserName = styled.div`
  color: ${(props) => props.theme.lightText};
  font-size: 16px;
`;
