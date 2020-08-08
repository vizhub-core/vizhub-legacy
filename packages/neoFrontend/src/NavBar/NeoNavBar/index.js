import React, { useContext } from 'react';
import { withTheme } from 'styled-components';
import { showAboutLink, showPricing } from '../../featureFlags';
import { LogoSVG } from '../../svg';
import { isMobile } from '../../mobileMods';
import { AuthContext, AUTH_PENDING } from '../../authentication';
import { UserActionsMenu } from './UserActionsMenu';
import { Search } from './Search';
import { DesktopLayout } from './DesktopLayout';
import { MobileLayout } from './MobileLayout';
import { NavLink } from './styles';
import { NavHREF } from './styles';

export const NeoNavBar = withTheme(
  ({
    theme,
    searchProps = {},
    showSearch = false,
    showAuth = false,
    isHomePage,
  }) => {
    const { navbarHeight, navbarLogoColor } = theme;
    const { me, signIn } = useContext(AuthContext);

    const Layout = isMobile ? MobileLayout : DesktopLayout;

    return (
      <Layout
        isHomePage={isHomePage}
        Logo={<LogoSVG height={navbarHeight} fill={navbarLogoColor} />}
        DashboardLink={
          me && me !== 'AUTH_PENDING' ? (
            <NavLink exact to={`/${me.userName}`}>
              Profile
            </NavLink>
          ) : null
        }
        Search={showSearch && <Search mobile={isMobile} {...searchProps} />}
        HomeLink={
          <NavLink exact to="/">
            Home
          </NavLink>
        }
        AboutLink={
          showAboutLink && (
            <NavHREF
              href="https://datavis.tech/vizhub/"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </NavHREF>
          )
        }
        PricingLink={
          showPricing ? (
            <NavLink exact to="/pricing">
              Pricing
            </NavLink>
          ) : null
        }
        AuthSection={
          showAuth && (
            <>
              {me && me !== AUTH_PENDING && (
                <UserActionsMenu mobile={isMobile} />
              )}
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
