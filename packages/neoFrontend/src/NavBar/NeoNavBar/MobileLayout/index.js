import React from 'react';
import { Banner } from '../styles';
import { SubBanner } from './styles';

export const MobileLayout = ({ Logo, Search, AuthSection }) => {
  return (
    <>
      <Banner mobile>
        {Logo}
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
