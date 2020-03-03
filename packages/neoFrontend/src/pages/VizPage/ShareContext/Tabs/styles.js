import styled from 'styled-components';
import { Clickable } from '../../../../styles';
export const Wrapper = styled.div`
  display: flex;
`;

export const TabWrapper = styled(Clickable)`
  font-size: 16px;
  font-weight: 500;
  border-bottom: ${props =>
    props.isActive ? `4px solid ${props.theme.interactive}` : 'none'};
  margin-right: 12px;
  padding: 4px;
  box-sizing: border-box;
`;

export const TabLabel = styled.div``;
