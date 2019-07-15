import React from 'react';

export const ArrowSVG = ({
  height = 18,
  fill = 'currentcolor',
  left = false
}) => (
  <svg height={height} viewBox={`0 0 11 20`}>
    <g
      fill={fill}
      transform={`translate(5.5,10) rotate(${
        left ? 0 : 180
      }) translate(-5.5,-10)`}
    >
      <rect
        width="13"
        height="2"
        x="-1"
        y="12.778"
        rx="1"
        transform="rotate(45 5.5 13.778)"
      />
      <rect
        width="13"
        height="2"
        x="-1"
        y="5"
        rx="1"
        transform="rotate(135 5.5 6)"
      />
    </g>
  </svg>
);
