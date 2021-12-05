// Common styles used in multiple pages.
import styled from 'styled-components';
import { Z_WAY_ABOVE } from '../styles';
import { Button } from '../Button';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${Z_WAY_ABOVE};
`;

export const FeedbackButton = styled(Button)`
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  width: 24px;
  height: unset;
  padding: 12px 0 12px 0;
  border-radius: 0;
  stroke-color: 'black';
  border-left: none;
  font-size: 12px;
  background-color: 0;
`;
