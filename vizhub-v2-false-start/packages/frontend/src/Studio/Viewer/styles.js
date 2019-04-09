import styled from 'styled-components';
import { Flex } from '../../styles';
import { LogoSVGAspectRatio } from '../../svg';

export const MainText = styled.div`
  color: ${props => props.theme.textMain};
`;

export const SmallText = styled.div`
  font-size: 0.8em;
  color: ${props => props.theme.textLight};
`;

export const Wrapper = styled.div`
  max-width: 980px;
`;

export const Padded = styled.div`
  padding: 8px;
`;

export const Header = styled(Flex)`
  justify-content: space-between;
`;

export const Logo = styled.div`
  width: ${props => props.theme.headerHeight * LogoSVGAspectRatio}px;
`;

export const Title = styled(MainText)`
  font-size: 1.5em;
  margin-bottom: 2px;
`;

export const TitleActions = styled(Flex)`
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const TitleViewCount = styled(Flex)`
  flex-direction: column;
`;

export const Actions = styled(Flex)`
  flex: 1;
  justify-content: flex-end;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
`;

export const HeaderAvatar = styled(Avatar)`
  height: ${props => props.theme.headerHeight}px;
  cursor: pointer;
`;

// Aligns the description to match the author name.
const authorAlign = ({ theme }) =>
  theme.infoAvatarHeight + theme.infoAvatarPadding;

export const Description = styled(MainText)`
  font-size: 1.1em;
  @media (min-width: 700px) {
    margin-left: ${authorAlign}px;
  }
`;

export const Provenance = styled(Flex)`
  margin: 10px 0px 4px 8px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const AuthorName = styled.div`
  color: ${props => props.theme.textMain};
  font-weight: bold;
`;
