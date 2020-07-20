// Common styles used in multiple pages.
import styled from 'styled-components';
import { Button } from '../../styles';

export const Feedback = styled(Button)`
  position: fixed;
  top: 50%;
  right: 0px;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  width: 30px;
  height: unset;
  padding: 16px 0 16px 0;
  border-radius: 0 6px 6px 0;
  border-left: none;
  font-size: 14px;
`;
