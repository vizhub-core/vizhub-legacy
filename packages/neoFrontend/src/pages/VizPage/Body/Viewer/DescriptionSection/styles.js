import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  padding: 20px 0 20px 0;
  font-size: 10px;
  flex-direction: ${props => (props.size === 'large' ? 'row' : 'column')};
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Right = styled.div`
  padding-left: 50px;
  ${props =>
    props.size === 'large'
      ? ''
      : `
        padding-left: 0;
        display: flex;
        justify-content: center;
        padding-top: 20px;
      `}
`;

export const Authorship = styled.div`
  display: flex;
  min-height: 40px;
  padding-bottom: 20px;
  flex-direction: ${props => (props.size === 'small' ? 'column' : 'row')};
`;

export const Author = styled(Link)`
  display: flex;
  flex: 1;
  align-items: center;
  color: currentcolor;
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
  justify-content: center;
  ${props =>
    props.size === 'small'
      ? `
        align-items: flex-start;
        padding-top: 10px;
      `
      : `
        align-items: flex-end;
      `}
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
  margin-left: ${props => (props.size === 'large' ? 50 : 0)}px;
`;

export const SemiBold = styled.span`
  font-weight: 600;
`;

export const VizLink = styled(Link)`
  font-style: italic;
`;
