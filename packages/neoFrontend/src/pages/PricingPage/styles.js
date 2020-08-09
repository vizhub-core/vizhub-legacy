import styled from 'styled-components';
import { isMobile } from '../../mobileMods';
export const Table = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: ${(props) => props.theme.borderRadiusMedium}px;
  padding: ${isMobile ? 10 : 84}px;
  font-size: 16px;
`;

export const Row = styled.div`
  margin: 24px 0 24px 0;
  display: flex;
  align-items: center;
`;

export const Left = styled.div`
  flex: 1;
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 300px;
`;

export const FeatureTitle = styled.div`
  font-size: ${(props) => props.theme.text.large};
`;

export const PlanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const PlanLabel = FeatureTitle;

export const PlanSubtext = styled.div`
  font-size: ${(props) => props.theme.text.small};
  margin-bottom: 10px;
`;

export const FeatureDescription = styled.div`
  color: ${(props) => props.theme.lightText};
  display: ${isMobile ? 'none' : 'block'};
`;
