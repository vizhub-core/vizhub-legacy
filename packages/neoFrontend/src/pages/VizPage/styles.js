import styled from 'styled-components';
import { Title } from '../styles';

export const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AttentionGrabbingTitle = styled(Title)`
  font-weight: bold;
  color: ${props => props.theme.attentionGrabber};
`;

export const Subtitle = styled.div`
  margin-top: 0;
`;
