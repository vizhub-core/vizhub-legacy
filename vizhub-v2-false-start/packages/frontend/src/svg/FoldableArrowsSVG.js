import React from 'react';
import { SVG } from './SVG';

const arrowProtrusion = 4;
const arrowRightPath = [
  'M',
  10 - arrowProtrusion / 2,
  ' 17l',
  5 + arrowProtrusion,
  '-5-',
  5 + arrowProtrusion,
  '-5v10z'
].join('');

const arrowDownPath = [
  'M7 ',
  10 - arrowProtrusion / 2,
  'l5 ',
  5 + arrowProtrusion,
  ' 5-',
  5 + arrowProtrusion,
  'z'
].join('');

// Derived from Material Design arrow-right icon.
// Modified viewBox.
export const ArrowRightSVG = props => (
  <SVG viewBox="4 4 16 16" {...props}>
    <path d={arrowRightPath} />
  </SVG>
);

// Derived from Material Design arrow-drop-down icon.
// Modified viewBox.
export const ArrowDownSVG = props => (
  <SVG viewBox="4 4 16 16" {...props}>
    <path d={arrowDownPath} />
  </SVG>
);
