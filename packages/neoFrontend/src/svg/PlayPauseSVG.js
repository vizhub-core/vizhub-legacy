import React from 'react';
import styled, { withTheme } from 'styled-components';

const SVG = styled.svg``;

const cx = 10;
const cy = 10;
const r = 9.45;

// Blue: #3866e9;
export const PlayPauseSVG = withTheme(
  ({
    down = false,
    height = 20,
    fill = 'currentcolor',
    didVote = false,
    theme
  }) => (
    <SVG height={height} viewBox={`0 0 20 20`}>
      <g
        fill={fill}
        transform={`translate(10,10) rotate(-90) translate(-10,-10)`}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          strokeWidth="1.1"
          stroke={fill}
          fill="none"
        />
        <path d="M10.041 13.974l4.52-4.521a.547.547 0 0 1 .774.774l-4.587 4.587a1 1 0 0 1-1.414 0l-4.587-4.587a.547.547 0 1 1 .774-.774l4.52 4.52z" />
      </g>
    </SVG>
  )
);
