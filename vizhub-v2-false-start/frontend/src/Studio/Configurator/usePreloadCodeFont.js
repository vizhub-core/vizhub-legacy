import { useEffect } from 'react';
import { mono } from '../../styles';

// Track this globally so we append the link tag only once.
let linkTagAppended = false;

// This will tell the browser to prefetch the font file.
// Inspired by
// https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization
// https://github.com/Esri/esri-loader/blob/master/src/utils/css.ts
const createPreloadLink = href =>
  Object.assign(document.createElement('link'), {
    rel: 'preload',
    as: 'font',
    crossOrigin: 'anonymous',
    href
  });

// This hook pre-loads the font used in the code editor.
export const usePreloadCodeFont = () => {
  useEffect(() => {
    if (!linkTagAppended) {
      document.head.appendChild(createPreloadLink(mono.url));
      linkTagAppended = true;
    }
  }, []);
};
