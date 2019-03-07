import styled from 'styled-components';
import { Avatar } from '../styles';
import { Flex } from '../../../styles';

export const InfoAvatar = styled(Avatar)`
  height: ${props => props.theme.infoAvatarHeight}px;
`;

export const Wrapper = styled(Flex)`
  font-size: 1.1em;
`;

export const OwnerNamePublishDate = styled(Flex)`
  margin-left: ${props => props.theme.infoAvatarPadding}px;
  flex-direction: column;
  justify-content: center;
`;
