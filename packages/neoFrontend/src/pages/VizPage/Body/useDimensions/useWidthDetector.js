import { useEffect } from 'react';

/**
 * A hook to listen for width changes or scroll-bar show/hide.
 *
 * Arguments:
 *  * containerRef - a React ref to the element whose width you want to measure.
 *  * onWidthChanged - a function that is invoked when the width changes.
 *
 * Based on https://gist.github.com/AdamMcCormick/d5f718d2e9569acdf7def25e8266bb2a
 */
export const useWidthDetector = (containerRef, onWidthChanged) => {
  useEffect(() => {
    if (containerRef) {
      const detector = document.createElement('iframe');
      Object.assign(detector.style, {
        height: 0,
        border: 0,
        width: '100%'
      });

      const container = containerRef.current;
      container.appendChild(detector);

      onWidthChanged();
      detector.contentWindow.addEventListener('resize', onWidthChanged);

      return () => {
        detector.contentWindow.removeEventListener('resize', onWidthChanged);
        container.removeChild(detector);
      };
    }
  }, [containerRef, onWidthChanged]);
};
