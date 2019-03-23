import { useEffect } from 'react';

// Track this globally so we append the link tag only once.
let linkTagAppended = {};

const woff = fontFamily => `/fonts/${fontFamily.replace(/ /g, '')}.woff`;

// This will tell the browser to prefetch the font file.
// Inspired by
// https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization
// https://github.com/Esri/esri-loader/blob/master/src/utils/css.ts
const createPreloadLink = fontFamily =>
  Object.assign(document.createElement('link'), {
    rel: 'preload',
    as: 'font',
    crossOrigin: 'anonymous',
    href: woff(fontFamily)
  });

// This hook pre-loads the font used in the code editor.
export const usePreloadFont = fontFamily => {
  useEffect(() => {
    if (!linkTagAppended[fontFamily]) {
      document.head.appendChild(createPreloadLink(fontFamily));
      linkTagAppended[fontFamily] = true;
    }
  }, [fontFamily]);
};
