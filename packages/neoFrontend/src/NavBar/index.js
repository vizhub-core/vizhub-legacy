import React, { useContext } from 'react';
import { withTheme } from 'styled-components';
import { LogoSVG } from '../svg';
import { AuthContext, AUTH_PENDING } from '../authentication';
import { Banner } from '../styles';
import { SignIn, LogoLink, Right, PricingLink } from './styles';
import { UserActionsMenu } from './UserActionsMenu';
import { Search } from './search';

export const NavBar = withTheme(
  ({
    theme,
    showSearch = false,
    showRight = true,
    showPricing = false,
    isHomePage = false,
    isAuthPage = false
  }) => {
    const { navbarHeight, navbarLogoColor } = theme;
    const { me, signIn } = useContext(AuthContext);

    return (
      <Banner>
        {isHomePage ? (
          <LogoSVG height={navbarHeight} fill={navbarLogoColor} />
        ) : (
          <LogoLink to="/" target="_blank" rel="noopener noreferrer">
            <LogoSVG height={navbarHeight} fill={navbarLogoColor} />
          </LogoLink>
        )}

        {showSearch && <Search />}

        {isAuthPage ? null : (
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
        )}
      </Banner>
    );
  }
);
