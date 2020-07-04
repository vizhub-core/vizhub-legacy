import React, { useContext } from 'react';
import { showPricing } from '../featureFlags';
import { withTheme } from 'styled-components';
import { LogoSVG } from '../svg';
import { isMobile } from '../mobileMods';
import { AuthContext, AUTH_PENDING } from '../authentication';
import { UserActionsMenu } from './UserActionsMenu';
import { Search } from './Search';
import { DesktopLayout } from './DesktopLayout';
import { MobileLayout } from './MobileLayout';
import { NavLink, LogoHREF } from './styles';

export const NavBar = withTheme(
  ({
    theme,
    searchProps = {},
    showSearch = false,
    showAuth = false,
  }) => {
    const { navbarHeight, navbarLogoColor } = theme;
    const { me, signIn } = useContext(AuthContext);

    const Layout = isMobile ? MobileLayout : DesktopLayout;

    return (
      <Layout 
        Logo={(
          <LogoHREF
            target="_blank"
            rel="noopener noreferrer"
            href="https://datavis.tech/vizhub/"
          >
            <LogoSVG height={navbarHeight} fill={navbarLogoColor} />
          </LogoHREF>
        )}
        Search={showSearch && <Search mobile={isMobile} {...searchProps} />}
        HomeLink={(
          <NavLink to="/">
            Home
          </NavLink>
        )}
        AboutLink={(
          <NavLink>
            About
          </NavLink>
        )}
        PricingLink={showPricing &&(
          <NavLink to="/pricing">
            Pricing
          </NavLink>
        )}
        AuthSection={showAuth && (
          <>
            {me && me !== AUTH_PENDING && <UserActionsMenu />}
            {!me && (
              <NavLink className="test-sign-in" onClick={signIn}>
                Sign in
              </NavLink>
            )}
          </>
        )}
      />
    );
  }
);
