import React, { useContext } from 'react';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router';
import { LogoSVG } from '../svg';
import { AuthContext, AUTH_PENDING } from '../authentication';
import { Banner } from '../styles';
import { SignIn, LogoLink, Right, PricingLink } from './styles';
import { UserActionsMenu } from './UserActionsMenu';

export const NavBar = withRouter(
  withTheme(({ theme, location, showRight = true, showPricing = false }) => {
    const { navbarHeight, navbarLogoColor } = theme;
    const { me, signIn } = useContext(AuthContext);

    return (
      <Banner>
        {location.pathname === '/' ? (
          <LogoSVG height={navbarHeight} fill={navbarLogoColor} />
        ) : (
          <LogoLink to="/">
            <LogoSVG height={navbarHeight} fill={navbarLogoColor} />
          </LogoLink>
        )}

        <Right
          className="test-user-navbar-section"
          data-test-is-authenticated={Boolean(me)}
        >
          {showPricing ? (
            <PricingLink to="/pricing">Pricing</PricingLink>
          ) : null}
          {me === AUTH_PENDING || !showRight ? null : me ? (
            <UserActionsMenu />
          ) : (
            <SignIn className="test-sign-in" onClick={signIn}>
              Sign up / Sign in
            </SignIn>
          )}
        </Right>
      </Banner>
    );
  })
);
