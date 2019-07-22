import { useEffect, useLayoutEffect, useCallback } from 'react';

const useListener = (type, listener, element = window) => {
  useEffect(() => {
    if (element) {
      element.addEventListener(type, listener);
      return () => {
        element.removeEventListener(type, listener);
      };
    }
  }, [type, listener, element]);
};

// Inspired by https://github.com/Swizec/useDimensions
export const useDimensions = ({ wrapperRef, setDomRect, scrollerRef = {} }) => {
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

  // Measure the dimensions on page resize.
  useListener('resize', measureTwice);

  // Measure the dimensions on editor resize,
  // a custom event fired when the VizHub editor is toggled,
  // which changes the width of the Viz viewer.
  useListener('editorResized', measureTwice);

  // Measure the dimensions on scroll (if scrollerRef provided).
  useListener('scroll', measure, scrollerRef.current);
};
