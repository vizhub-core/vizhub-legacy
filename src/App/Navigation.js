import React from 'react';
import { LogoSVG } from '../svg/LogoSVG';
import { classed } from './classed';

const LogoLink = classed('logo-link', 'a');

export const Navigation = ({ linkLogoToHome = true }) => (
  <div className="navigation" data-theme="dark">
    {linkLogoToHome ? (
      <LogoLink href="/">
        <LogoSVG />
      </LogoLink>
    ) : (
      <LogoSVG />
    )}
  </div>
);
