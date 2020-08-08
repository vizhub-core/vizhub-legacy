import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Z_WAY_ABOVE } from '../../../styles';

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

export const SubBanner = styled.div`
  position: sticky;
  width: 100%;
  top: ${(props) => props.theme.bannerHeightMobile}px;
  z-index: ${Z_WAY_ABOVE};
  padding-bottom: ${(props) => props.theme.bannerPadding}px;
  background-color: ${(props) => props.theme.bannerBackground};
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;
