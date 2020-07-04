import styled from 'styled-components';
import { Z_WAY_ABOVE } from '../../styles';

export const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  position: sticky;
  top: ${(props) => props.theme.bannerHeight}px;
  height: ${(props) => props.theme.bannerHeight / 2}px;
  z-index: ${Z_WAY_ABOVE};
  background: #494949;
`;
