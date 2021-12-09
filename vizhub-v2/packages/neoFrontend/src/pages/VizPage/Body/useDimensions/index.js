import { useCallback, useLayoutEffect } from 'react';
import { useListener } from '../useListener';
import { useDimensionsDetector } from './useDimensionsDetector';

// Inspired by https://github.com/Swizec/useDimensions
export const useDimensions = ({
  wrapperRef,
  setDomRect,
  scrollerRef,
  onDimensionsChanged,
  globalResize = false,
}) => {
  // Measures the current dimensions.
  const measure = useCallback(() => {
    setDomRect(wrapperRef.current.getBoundingClientRect());
  }, [wrapperRef, setDomRect]);

  // Measure the dimensions on scroll (if scrollerRef provided).
  useListener('scroll', measure, scrollerRef && scrollerRef.current);

  // Capture the initial dimensions before first render.
  // This is also before the vertical scrollbar appears,
  // but having this here avoids a flash of zero-height viz.
  useLayoutEffect(measure, [measure]);

  // Detect when width of the scroller element changes.
  // This also fires when the scrollbar is added or removed.
  // Does nothing if scrollerRef is undefined.
  useDimensionsDetector(
    scrollerRef,
    useCallback(() => {
      measure();
      if (onDimensionsChanged) {
        onDimensionsChanged();
      }
    }, [measure, onDimensionsChanged])
  );

  // Measure the dimensions on window resize
  // if globalResize flag enabled (defaults to false).
  useListener('resize', measure, globalResize && window);

  return measure;
};
