import styled from 'styled-components';
import { Clickable } from '../../../../../styles';

export const Wrapper = styled(Clickable)`
  width: 125px;
  height: ${(props) => props.theme.headHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.div`
  font-weight: 600;
  margin-left: 10px;
  user-select: none;
`;
