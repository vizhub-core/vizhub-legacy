import React, { useEffect, useState, useRef } from 'react';
import { LogoSVG } from '../svg/LogoSVG';
import { classed } from './classed';
import { isClient } from './isClient';
const { max, min } = Math;

const LogoLink = classed('logo-link', 'a');

export const Navigation = ({ linkLogoToHome = true }) => {
  const ref = useRef();

  // Implement sticky header with show/hide on scroll.
  useEffect(() => {
    if (isClient) {
      // Get height defined in CSS.
      // This approach supports CSS as the single source of truth,
      // rather than duplicating the hardcoded value.
      const height = parseFloat(window.getComputedStyle(ref.current).height);

      let previousScroll = window.pageYOffset;
      let top = 0;
      const handleScroll = () => {
        //Compute scroll delta.
        const currentScroll = window.pageYOffset;
        const delta = previousScroll - currentScroll;
        previousScroll = currentScroll;

        // Update navbar top.
        const newTop = min(max(top + delta, -height), 0);
        if (newTop !== top) {
          top = newTop;
          ref.current.style.top = top + 'px';
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div className="navigation" ref={ref} data-theme="dark">
      {linkLogoToHome ? (
        <LogoLink href="/">
          <LogoSVG />
        </LogoLink>
      ) : (
        <LogoSVG />
      )}
    </div>
  );
};
