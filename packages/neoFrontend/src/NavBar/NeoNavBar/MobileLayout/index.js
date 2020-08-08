import React from 'react';
import { Banner } from '../styles';
import { SubBanner, LogoLink } from './styles';

export const MobileLayout = ({ Logo, Search, AuthSection }) => {
  return (
    <>
      <Banner mobile>
        <LogoLink to="/">{Logo}</LogoLink>
        {AuthSection}
      </Banner>
      {Search && <SubBanner>{Search}</SubBanner>}

      {/* TODO: need to think how to enable links on mobile */}
      {/* <Links>
        {HomeLink}
        {AboutLink}
        {PricingLink}
      </Links> */}
    </>
  );
};
