// Common styles used in multiple pages.
import styled from 'styled-components';
import { Z_WAY_ABOVE } from '../../../styles';
import { Button } from '../../styles';

export const FeedbackWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${Z_WAY_ABOVE};
`;

export const Feedback = styled(Button)`
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  width: 30px;
  height: unset;
  padding: 16px 0 16px 0;
  border-radius: 0 6px 6px 0;
  border-left: none;
  font-size: 14px;
  background-color: white;
`;
