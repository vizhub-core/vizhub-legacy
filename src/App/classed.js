import React from 'react';

// Generates a component that's a div (or specified tagName) with a class.
export const classed =
  (className, type = 'div') =>
  (props) =>
    React.createElement(type, { className, ...props }, props.children);
