import React, { useContext } from 'react';
import { AuthContext } from '../../../authentication';
import { Banner } from '../styles';
import { Right, Left } from './styles';

export const DesktopLayout = ({
  Logo,
  Search,
  AboutLink,
  ForumLink,
  PricingLink,
  AuthSection,
  isHomePage,
}) => {
  const { me } = useContext(AuthContext);

  return (
    <Banner isHomePage={isHomePage}>
      <Left>
        {Logo}
      </Left>
      <Right
        className="test-user-navbar-section"
        data-test-is-authenticated={Boolean(me)}
      >
        {Search}
        {AboutLink}
        {ForumLink}
        {PricingLink}
        {AuthSection}
      </Right>
    </Banner>
  );
};
