import styled from 'styled-components';
import { Clickable } from '../../../../styles';
export const Wrapper = styled.div`
  display: flex;
`;

export const TabWrapper = styled(Clickable)`
  font-size: 16px;
  font-weight: 500;
  border-bottom: 4px solid ${props => props.theme.interactive};
  margin-right: 12px;
  padding: 4px;
`;

export const TabLabel = styled.div``;
