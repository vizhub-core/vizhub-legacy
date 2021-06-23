// This file configures how package names are resolved to browser globals.
// It is required to support the strategy of sourcing large dependencies from a CDN,
// rather than including them in our bundle(s).

// Used by Rollup config.
export const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'd3-require': 'd3',
};

// Used by d3-require.
export const aliases = () => ({
  react: React,
  'react-dom': ReactDOM,
});
