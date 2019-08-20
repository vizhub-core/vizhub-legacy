import React from 'react';

export const TrashSVG = ({ height = 15, fill = 'currentcolor' }) => (
  <svg height={height} viewBox="0 0 12 15">
    <path
      fill={fill}
      d="M10 4a1 1 0 0 1 1 1.2l-2 9a1 1 0 0 1-1 .8H4a1 1 0 0 1-1-.8l-2-9A1 1 0 0 1 2 4h8zM8.8 6H3.2l1.6 7h2.4l1.6-7zM8 0c.6 0 1 .4 1 1h2a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2h2c0-.6.4-1 1-1h4z"
    />
  </svg>
);
