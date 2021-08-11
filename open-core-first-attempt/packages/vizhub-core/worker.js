// This entry point is for Web Workers.
// It does not export any React Context definitions,
// which interfere with tree shaking and break the build.
export { jsDelivrCombine } from './src/isomorphic/jsDelivrCombine';
export { classed } from './src/isomorphic/classed';
export { isClient } from './src/isomorphic/isClient';

export { getFileText } from './src/entities';
