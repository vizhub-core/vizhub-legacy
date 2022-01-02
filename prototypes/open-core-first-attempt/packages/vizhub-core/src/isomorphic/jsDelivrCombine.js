// Constructs the src attribute of a <script> tag
// that pulls in multiple libraries from JSDelivr
// with only a single network request.
// See https://www.jsdelivr.com/features#combine
export const jsDelivrCombine = (libs) =>
  'https://cdn.jsdelivr.net/combine/' +
  libs.map((lib) => `npm/${lib}`).join(',');
