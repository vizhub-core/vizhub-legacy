import styled from 'styled-components';
import { Clickable } from '../styles';

export const Wrapper = styled(Clickable)`
  width: 125px;
  display: flex;
  align-items: center;
`;

export const Text = styled.div`
  font-weight: 600;
  margin-left: 10px;
  margin-top: 2px;
  user-select: none;
`;
