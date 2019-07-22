import { useEffect, useLayoutEffect, useCallback } from 'react';

const listen = (type, listener, element = window) => {
  element.addEventListener(type, listener);
  return () => {
    element.removeEventListener(type, listener);
  };
};

// Inspired by https://github.com/Swizec/useDimensions
export const useDimensions = ({ wrapperRef, scrollerRef, setDomRect }) => {
  // Measures the current dimensions.
  const measure = useCallback(() => {
    setDomRect(wrapperRef.current.getBoundingClientRect());
  }, [wrapperRef, setDomRect]);

  // Handles the case that the first measure causes a vertical
  // scrollbar to be introduced, which throws off the transform.
  // requestAnimationFrame effectively waits for the scrollbar to appear.
  const measureTwice = useCallback(() => {
    measure();
    requestAnimationFrame(measure);
  }, [measure]);

  // Measure the initial dimensions.
  useLayoutEffect(measureTwice, [measure]);

  // Measure the dimensions on resize.
  useEffect(() => listen('resize', measureTwice), [measureTwice]);

  // Measure the dimensions on scroll (if scrollerRef provided).
  useEffect(() => {
    if (scrollerRef) {
      return listen('scroll', measure, scrollerRef.current);
    }
  }, [measure, scrollerRef]);

  // Measure the dimensions on editor toggle,
  // a custom event fired when the VizHub editor is toggled,
  // which changes the width of the Viz viewer.
  useEffect(() => listen('editorResized', measureTwice), [measureTwice]);
};
