import React from 'react';

// Generates a component that's a div with a class.
export const classed =
  (className) =>
  ({ children }) =>
    <div className={className}>{children}</div>;
