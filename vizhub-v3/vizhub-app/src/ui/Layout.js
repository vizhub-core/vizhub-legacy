import React from 'react';
// TODO import { Navigation } from './Navigation';

const showBanner = true;

const Banner = () => (
  <a
    href="https://github.com/vizhub-core/vizhub/tree/main/vizhub-v3"
    className="vizhub-banner"
  >
    Welcome vizhub.community! This is a demo instance of{' '}
    <span style={{ textDecoration: 'underline' }}>
      VizHub Community Edition
    </span>
    .{' '}
    <span style={{ fontWeight: 'bold' }}>
      All data here is deleted every 24 hours.
    </span>
  </a>
);

export const Layout = ({ children, className }) => {
  return (
    <div className={className}>
      {showBanner ? <Banner /> : null}
      {children}
    </div>
  );
};
