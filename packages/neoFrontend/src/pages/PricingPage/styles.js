import styled from 'styled-components';
export const Table = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: ${(props) => props.theme.borderRadiusMedium}px;
  padding: 84px;
  font-size: 16px;
`;

export const Row = styled.div`
  margin: 24px 0 24px 0;
  display: flex;
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
  font-weight: 500;
`;

export const PlanLabel = FeatureTitle;

export const FeatureDescription = styled.div`
  color: ${(props) => props.theme.lightText};
`;

export const EmptySpace = styled.div`
  width: 100px;
`;
