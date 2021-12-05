import styled from 'styled-components';
import { LogoSVGAspectRatio } from '../../../svg';
import { Flex } from '../../../styles';
import { Avatar } from '../styles';

export const Wrapper = styled(Flex)`
  justify-content: space-between;
`;

export const Logo = styled.div`
  width: ${props => props.theme.headerHeight * LogoSVGAspectRatio}px;
`;

export const HeaderAvatar = styled(Avatar)`
  height: ${props => props.theme.headerHeight}px;
  cursor: pointer;
`;
