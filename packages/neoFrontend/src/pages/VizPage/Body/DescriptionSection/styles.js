import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  padding: 20px 0 20px 0;
  font-size: 10px;
`;

export const Left = styled.div`
  padding-right: 10px;
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Right = styled.div`
  padding-left: 50px;
`;

export const Authorship = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding-bottom: 20px;
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
`;

export const Description = styled.div`
  font-size: 12px;
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

export const SemiBold = styled.span`
  font-weight: 600;
`;

export const VizLink = styled(Link)`
  font-style: italic;
`;
