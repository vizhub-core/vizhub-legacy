import React, { useContext } from 'react';
import { withTheme } from 'styled-components';
import { showPricing, showAboutLink } from '../../featureFlags';
import { LogoSVG } from '../../svg';
import { isMobile } from '../../mobileMods';
import { AuthContext, AUTH_PENDING } from '../../authentication';
import { UserActionsMenu } from './UserActionsMenu';
import { Search } from './Search';
import { DesktopLayout } from './DesktopLayout';
import { MobileLayout } from './MobileLayout';
import { NavLink, LogoHREF } from './styles';

export const NavBar = withTheme(
  ({ theme, searchProps = {}, showSearch = false, showAuth = false }) => {
    const { navbarHeight, navbarLogoColor } = theme;
    const { me, signIn } = useContext(AuthContext);

    const Layout = isMobile ? MobileLayout : DesktopLayout;

    return (
      <Layout
        Logo={
          <LogoHREF
            target="_blank"
            rel="noopener noreferrer"
            href="https://datavis.tech/vizhub/"
          >
            <LogoSVG height={navbarHeight} fill={navbarLogoColor} />
          </LogoHREF>
        }
        Search={showSearch && <Search mobile={isMobile} {...searchProps} />}
        HomeLink={
          <NavLink exact to="/">
            Home
          </NavLink>
        }
        AboutLink={showAboutLink && <NavLink exact>About</NavLink>}
        PricingLink={
          showPricing && (
            <NavLink exact to="/pricing">
              Pricing
            </NavLink>
          )
        }
        AuthSection={
          showAuth && (
            <>
              {me && me !== AUTH_PENDING && <UserActionsMenu mobile={isMobile} />}
              {!me && (
                <NavLink className="test-sign-in" to="" onClick={signIn}>
                  Sign in
                </NavLink>
              )}
            </>
          )
        }
      />
    );
  }
);
