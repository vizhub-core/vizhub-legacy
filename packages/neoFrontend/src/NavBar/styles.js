import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Z_WAY_WAY_ABOVE } from '../styles';

export const NavLink = styled(Link)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  color: #B5B5B5;
  margin-left: ${(props) => props.theme.bannerPadding}px;
  margin-right: ${(props) => props.theme.bannerPadding}px;
`;

export const LogoLink = styled(Link)`
  line-height: 0;
  color: currentcolor;
`;

export const LogoHREF = styled.a`
  line-height: 0;
  color: currentcolor;
`;

export const Banner = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: ${Z_WAY_WAY_ABOVE};
    
  display: flex;
  height: ${(props) => props.theme.bannerHeight}px;
  background-color: ${(props) => props.theme.bannerBackground};
  align-items: center;
  padding-right: 24px;
  padding-left: 24px;
  box-sizing: border-box;
  justify-content: space-between;
`;
