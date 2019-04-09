import React from 'react';
import { SVG } from './SVG';

// Derived from Octicons pencil icon.
// Original viewBox="0 0 14 16"
// viewBox modified to achieve consistent aspect ratio across icons.
export const EditSVG = () => (
  <SVG viewBox="-1 0 16 16">
    <path d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z" />
  </SVG>
);
