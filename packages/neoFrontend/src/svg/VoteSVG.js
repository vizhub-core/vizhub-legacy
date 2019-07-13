import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg``;

const Circle = styled.circle`
  ${SVG}:hover & {
    fill: ${props => props.theme.iconHoverBackground};
  }
  ${SVG}:active & {
    fill: ${props => props.theme.iconActiveBackground};
  }
`;

export const VoteSVG = ({
  down = false,
  height = 20,
  fill = 'currentcolor'
}) => (
  <SVG height={height} viewBox={`0 0 20 20`}>
    <g
      fill={fill}
      transform={`translate(10,10) rotate(${
        down ? 0 : 180
      }) translate(-10,-10)`}
    >
      <Circle
        cx="10"
        cy="10"
        r="9.45"
        stroke-width="1.1"
        stroke={fill}
        fill="none"
      />
      <path d="M10.041 13.974l4.52-4.521a.547.547 0 0 1 .774.774l-4.587 4.587a1 1 0 0 1-1.414 0l-4.587-4.587a.547.547 0 1 1 .774-.774l4.52 4.52z" />
      <path d="M10.63 14.747H9.452V5.335a.588.588 0 1 1 1.176 0v9.412z" />
    </g>
  </SVG>
);
