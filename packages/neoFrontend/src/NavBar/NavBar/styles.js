import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SignIn = styled.div`
  color: ${(props) => props.theme.attentionGrabber};
  font-weight: bold;
  cursor: pointer;
  user-select: none;
`;

export const PricingLink = styled(Link)`
  font-weight: bold;
  margin-right: 50px;
`;

export const LogoLink = styled(Link)`
  line-height: 0;
  color: currentcolor;
`;

export const LogoHREF = styled.a`
  line-height: 0;
  color: currentcolor;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
`;

export const Banner = styled.div`
  display: flex;
  flex: 1;
  max-width: ${(props) =>
    Number.isInteger(props.theme.bannerMaxWidth)
      ? `${props.theme.bannerMaxWidth}px`
      : props.theme.bannerMaxWidth};
  min-height: ${(props) =>
    props.isMobile
      ? props.theme.bannerHeightMobile
      : props.theme.bannerHeight}px;
  padding-left: ${(props) => props.theme.bannerPadding}px;
  padding-right: ${(props) => props.theme.bannerPadding}px;
  align-items: center;
  background-color: ${(props) => props.theme.bannerBackground};
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
`;
