import styled from 'styled-components';
import { Avatar, MainText, SmallText } from '../styles';
import { Flex } from '../../../styles';

export const Wrapper = styled(Flex)`
  flex-direction: column;
  margin-top: 10px;
  margin-left: 5px;
`;

export const Comment = styled(Flex)`
  margin-top: 14px;
`;

export const CommentAvatar = styled(Avatar)`
  height: ${props => props.theme.commentAvatarHeight}px;
  margin-right: 5px;
`;

export const Right = styled.div`
  margin-left: 4px;
`;

export const Time = styled(SmallText)`
  margin-left: 10px;
`;

export const Content = styled(MainText)`
  margin-top: 2px;
`;

export const AuthorNameTime = styled(Flex)`
  align-items: flex-end;
`;
