import styled, { css } from 'styled-components';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { Z_WAY_WAY_ABOVE } from '../../styles';

const linkCSS = css`
  font-style: normal;
  font-weight: 500;
  font-size: ${(props) => props.theme.navLinkFontSize};
  line-height: 19px;

  color: #b5b5b5;
  margin-left: ${(props) => props.theme.bannerPadding}px;
  margin-right: ${(props) => props.theme.bannerPadding}px;

  &.active {
    color: #ffffff;
  }

  &:hover {
    color: #ffffff;
  }
`;

export const NavLink = styled(RouterNavLink)`
  ${linkCSS}
`;

export const NavLinkDiv = styled.div`
  ${linkCSS}
  cursor: pointer;
`;

export const NavHREF = styled.a`
  ${linkCSS}
`;

export const LogoLink = styled(Link)`
  line-height: 0;
  color: currentcolor;
`;

export const Banner = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: ${Z_WAY_WAY_ABOVE};

  display: flex;
  height: ${(props) =>
    props.mobile ? props.theme.bannerHeightMobile : props.theme.bannerHeight}px;
  background-color: ${(props) => props.theme.bannerBackground};
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: space-between;
  margin-bottom: ${(props) =>
    props.mobile ? 0 : props.isHomePage ? 0 : props.theme.bannerMarginBottom}px;
`;
