import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  padding: 20px 0 20px 0;
  font-size: 10px;
  flex-wrap: wrap;
`;

export const Middle = styled.div`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Right = styled.div`
  padding-left: 50px;
`;

export const Authorship = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  padding-bottom: 20px;
  flex-wrap: wrap;
`;

export const Author = styled.div`
  display: flex;
  flex: 1;
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
`;

export const SemiBold = styled.span`
  font-weight: 600;
`;

export const VizLink = styled(Link)`
  font-style: italic;
`;
