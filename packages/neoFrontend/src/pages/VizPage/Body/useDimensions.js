import { useCallback } from 'react';
import { useListener } from '../useListener';
import { useWidthDetector } from './useWidthDetector';

// Inspired by https://github.com/Swizec/useDimensions
export const useDimensions = ({ wrapperRef, setDomRect, scrollerRef = {} }) => {
  // Measures the current dimensions.
  const measure = useCallback(() => {
    setDomRect(wrapperRef.current.getBoundingClientRect());
  }, [wrapperRef, setDomRect]);

  // Measure the dimensions on scroll (if scrollerRef provided).
  useListener('scroll', measure, scrollerRef.current);

  // Detect when width of the scroller element changes.
  // This also fires when the scrollbar is added or removed.
  useWidthDetector(scrollerRef, measure);
};
