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
  margin-top: 10px;
  font-size: 50px;
`;

export const Subtitle = styled.div`
  font-size: 22px;
`;

export const LearnMoreLink = styled.a`
  margin-bottom: 40px;
`;

export const Section = styled.div`
  text-align: left;
  margin-bottom: 30px;
`;

export const SectionTitle = styled.div`
  font-size: 22px;
  padding-left: 5px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const SeeMore = styled.a`
  font-size: 18px;
  padding-right: 5px;
  margin-top: -10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;
