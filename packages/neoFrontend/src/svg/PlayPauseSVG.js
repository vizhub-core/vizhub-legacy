import React from 'react';
import { arc } from 'd3-shape';

// TODO unify these into one place. Shared by upvote icon.
const r = 9.45;
const strokeWidth = 1.1;

const runTimerProgressArc = arc()
  .innerRadius(r - (strokeWidth * 3) / 2)
  .outerRadius(r)
  .startAngle(0);

const Pause = () => (
  <>
    <rect x="-3" y="-4" width="2" height="8" />
    <rect x="1" y="-4" width="2" height="8" />
  </>
);

export const PlayPauseSVG = ({ height = 20, runTimerProgress }) => (
  <svg height={height} viewBox={`0 0 20 20`}>
    <g transform="translate(10,10)" fill="currentcolor">
      <path
        fill="#3866e9"
        d={runTimerProgressArc({
          startAngle: 0,
          endAngle: runTimerProgress * Math.PI * 2
        })}
      />
      <circle
        r={r}
        strokeWidth={strokeWidth}
        stroke="currentcolor"
        fill="none"
      />
      <Pause />
    </g>
  </svg>
);
