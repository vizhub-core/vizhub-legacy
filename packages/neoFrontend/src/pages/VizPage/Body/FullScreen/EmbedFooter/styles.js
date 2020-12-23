import styled from 'styled-components';
import { Z_WAY_ABOVE } from '../../../../../styles';

export const Wrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_WAY_ABOVE};
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0.1;
  transition: opacity 0.2s ease-out;
  :hover {
    opacity: 1;
  }
`;

export const LogoWrapper = styled.a`
  color: #ffffff;
  background-color: #000000;
  display: flex;
  padding: 2px;
`;

export const LogoText = styled.div`
  font-weight: bold;
  margin-right: 8px;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.2s ease-out;
  ${Wrapper}:hover & {
    opacity: 1;
  }
`;
