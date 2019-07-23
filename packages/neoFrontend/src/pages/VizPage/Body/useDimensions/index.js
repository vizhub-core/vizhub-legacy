import { useCallback, useLayoutEffect } from 'react';
import { useListener } from './useListener';
import { useWidthDetector } from './useWidthDetector';

// Inspired by https://github.com/Swizec/useDimensions
export const useDimensions = ({
  wrapperRef,
  setDomRect,
  scrollerRef,
  onWidthChanged,
  globalResize = false
}) => {
  // Measures the current dimensions.
  const measure = useCallback(() => {
    console.log('measuring');
    if (wrapperRef.current) {
      setDomRect(wrapperRef.current.getBoundingClientRect());
    }
  }, [wrapperRef, setDomRect]);

  // Necessary to catch up to scrollbar appearances and disappearances.
  const measureTwice = useCallback(() => {
    measure();
    requestAnimationFrame(measure);
  }, [measure]);

  // Measure the dimensions on scroll (if scrollerRef provided).
  useListener('scroll', measure, scrollerRef && scrollerRef.current);

  // Capture the initial dimensions before first render.
  // This is also before the vertical scrollbar appears,
  // but having this here avoids a flash of zero-height viz.
  useLayoutEffect(measure, []);

  // Detect when width of the scroller element changes.
  // This also fires when the scrollbar is added or removed.
  useWidthDetector(scrollerRef, () => {
    measureTwice();
    if (onWidthChanged) {
      onWidthChanged();
    }
  });

  // Measure the dimensions on window resize
  // if globalResize flag enabled (defaults to false).
  useListener('resize', measure, globalResize && window);
};
