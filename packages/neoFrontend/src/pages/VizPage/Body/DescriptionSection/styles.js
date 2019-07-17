import styled from 'styled-components';
import { Link } from 'react-router-dom';

const mobileLarge = '700px';
const mobileSmall = '500px';

export const Wrapper = styled.div`
  display: flex;
  padding: 20px 0 20px 0;
  font-size: 10px;
  @media (max-width: ${mobileLarge}) {
    flex-direction: column;
  }
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Right = styled.div`
  padding-left: 50px;
  @media (max-width: ${mobileLarge}) {
    padding-left: 0;
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
`;

export const Authorship = styled.div`
  display: flex;
  min-height: 40px;
  padding-bottom: 20px;
  @media (max-width: ${mobileSmall}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Author = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const AuthorAvatar = styled.div`
  width: 40px;
  margin-right: 10px;
`;

export const AuthorName = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const AuthorshipMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: ${mobileSmall}) {
    align-items: flex-start;
    padding-top: 10px;
  }
  justify-content: center;
`;

export const Video = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VideoThumbnail = styled.div`
  width: 200px;
  height: 113px;
  box-shadow: ${props => props.theme.shadowLight};
  background-color: #ffffff;
  margin-bottom: 4px;
`;

export const Description = styled.div`
  font-size: 12px;
  margin-left: 50px;
  @media (max-width: ${mobileLarge}) {
    margin-left: 0;
  }
`;

export const SemiBold = styled.span`
  font-weight: 600;
`;

export const VizLink = styled(Link)`
  font-style: italic;
`;
