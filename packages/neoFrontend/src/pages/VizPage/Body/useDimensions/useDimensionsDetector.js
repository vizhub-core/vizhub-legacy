import { useEffect } from 'react';

/**
 * A hook to listen for width and height changes (detects scroll-bar show/hide).
 *
 * Arguments:
 *  * containerRef - a React ref to the element whose width you want to measure.
 *  * onDimensionsChanged - a function that is invoked when the width changes.
 *
 * Based on https://gist.github.com/AdamMcCormick/d5f718d2e9569acdf7def25e8266bb2a
 */
export const useDimensionsDetector = (containerRef, onDimensionsChanged) => {
  useEffect(() => {
    if (containerRef) {
      const detector = document.createElement('iframe');
      Object.assign(detector.style, {
        border: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        'pointer-events': 'none',
      });

      const container = containerRef.current;
      container.appendChild(detector);

      onDimensionsChanged();
      detector.contentWindow.addEventListener('resize', onDimensionsChanged);

      return () => {
        detector.contentWindow &&
          detector.contentWindow.removeEventListener(
            'resize',
            onDimensionsChanged
          );
        container.removeChild(detector);
      };
    }
  }, [containerRef, onDimensionsChanged]);
};
