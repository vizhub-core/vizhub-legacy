import React from 'react';

export const ArrowRightSVG = ({ height = 18, fill = 'currentcolor' }) => (
  <svg height={height} viewBox={`0 0 10 18`}>
    <g fill={fill}>
      <path d="M7.893 9.736l-7.071-7a.896.896 0 0 1 0-1.273.914.914 0 0 1 1.285 0l7.071 7a.896.896 0 0 1 0 1.273.914.914 0 0 1-1.285 0z" />
      <path d="M.822 15.464l7.07-7a.914.914 0 0 1 1.286 0 .896.896 0 0 1 0 1.272l-7.07 7a.914.914 0 0 1-1.286 0 .896.896 0 0 1 0-1.272z" />
    </g>
  </svg>
);
