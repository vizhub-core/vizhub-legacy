// Computes a JSDelivr CDN URL that will fetch multiple JS libraries
// concatenated together (they each introduce their own globals).
export const jsDelivrCombine = (libs) =>
  'https://cdn.jsdelivr.net/combine/' +
  libs.map((lib) => `npm/${lib}`).join(',');
