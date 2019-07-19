import { useEffect, useLayoutEffect, useCallback } from 'react';

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
  useEffect(() => {
    window.addEventListener('resize', measureTwice);
    return () => {
      window.removeEventListener('resize', measureTwice);
    };
  }, [measureTwice, scrollerRef]);

  // Measure the dimensions on scroll.
  useEffect(() => {
    if (scrollerRef) {
      const scroller = scrollerRef.current;
      scroller.addEventListener('scroll', measure);
      return () => {
        scroller.removeEventListener('scroll', measure);
      };
    }
  }, [measure, scrollerRef]);

  // Measure the dimensions on editor toggle,
  // a custom event fired when the VizHub editor is toggled,
  // which changes the width of the Viz viewer.
  useEffect(() => {
    window.addEventListener('editorToggled', measureTwice);
    return () => {
      window.removeEventListener('editorToggled', measureTwice);
    };
  }, [measureTwice]);
};
