import React from 'react';
import styled, { withTheme } from 'styled-components';
import { arc } from 'd3-shape';

// TODO unify these into one place. Shared by upvote icon.
const cx = 10;
const cy = 10;
const r = 9.45;
const strokeWidth = 1.1;

const runTimerProgressArc = arc()
  .innerRadius(r - (strokeWidth * 3) / 2)
  .outerRadius(r - strokeWidth / 2)
  .startAngle(0);

export const PlayPauseSVG = withTheme(({ height = 20, runTimerProgress }) => (
  <svg height={height} viewBox={`0 0 20 20`}>
    <g transform="translate(10,10)">
      <circle
        r={r}
        strokeWidth={strokeWidth}
        stroke="currentcolor"
        fill="none"
      />
      <path
        fill="#3866e9"
        d={runTimerProgressArc({
          startAngle: 0,
          endAngle: runTimerProgress * Math.PI * 2
        })}
      />
    </g>
  </svg>
));
