import React from 'react';
import { Banner } from '../styles';
import { Links } from './styles';

export const MobileLayout = ({
  Logo,
  Search,
  HomeLink,
  AboutLink,
  PricingLink,
  AuthSection
}) => {
  return (
    <>
      <Banner>
        {Logo}
        {Search}
        {AuthSection}
      </Banner>
      <Links>
        {HomeLink}
        {AboutLink}
        {PricingLink}
      </Links>
    </>
  );
};
