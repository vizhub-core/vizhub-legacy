import styled from 'styled-components';
import { Title } from '../styles';

export const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px 0 15px;
  text-align: center;
`;

export const AttentionGrabbingTitle = styled(Title)`
  font-weight: bold;
  color: ${(props) => props.theme.attentionGrabber};
`;

export const Subtitle = styled.div`
  margin-top: 0;
  margin-bottom: 30px;
`;

export const LearnMoreLink = styled.a`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.div`
  font-size: 20px;
`;
