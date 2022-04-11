import React from 'react';

const showBanner = true;

const Banner = () => (
  <a
    href="https://github.com/vizhub-core/vizhub/tree/main/vizhub-v3"
    className="vizhub-banner"
  >
    Welcome vizhub.community, a demo of{' '}
    <span style={{ textDecoration: 'underline' }}>
      VizHub Community Edition
    </span>
    (work in progress).{' '}
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
