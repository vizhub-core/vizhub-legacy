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
import { NavLink, NavLinkDiv, NavHREF, LogoLink } from './styles';

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
        Logo={
          <LogoLink to="/">
            <LogoSVG height={navbarHeight} fill={navbarLogoColor} />
          </LogoLink>
        }
        DashboardLink={
          me && me !== 'AUTH_PENDING' ? (
            <NavLink exact to={`/${me.userName}`}>
              Profile
            </NavLink>
          ) : null
        }
        Search={showSearch && <Search mobile={isMobile} {...searchProps} />}
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
        ForumLink={
          <NavHREF
            href="https://vizhub.com/forum/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Forum
          </NavHREF>
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
                <NavLinkDiv className="test-sign-in" to="" onClick={signIn}>
                  Sign in
                </NavLinkDiv>
              )}
            </>
          )
        }
      />
    );
  }
);
