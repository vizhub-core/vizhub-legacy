const breakpoints = {
  huge: '1440px',
  large: '1170px',
  medium: '768px',
  small: '450px',
};

export const lessThan = (key) => {
  return (style) => `@media ((max-width: ${breakpoints[key]}) { ${style} }`;
};

export const between = (key1, key2) => {
  return (style) =>
    `@media (min-width: ${breakpoints[key1]}) and (max-width: ${breakpoints[key2]}) { ${style} }`;
};

export const greaterThan = (key) => {
  return (style) => `@media (min-width: ${breakpoints[key]}) { ${style} }`;
};
