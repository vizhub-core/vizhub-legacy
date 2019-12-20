import React from 'react';

const cx = 10;
const cy = 10;
const r = 9.45;
const rInner = 6;

export const RadioButtonSVG = ({
  height = 20,
  fill = 'currentcolor',
  isActive
}) => (
  <svg height={height} viewBox={`0 0 20 20`}>
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        strokeWidth="1.1"
        stroke={fill}
        fill="none"
      />
      <circle cx={cx} cy={cy} r={rInner} fill={isActive ? fill : 'none'} />
    </g>
  </svg>
);
