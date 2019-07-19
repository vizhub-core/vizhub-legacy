import { useEffect, useLayoutEffect, useCallback } from 'react';

// Inspired by https://github.com/Swizec/useDimensions
export const useDimensions = ({ wrapperRef, scrollerRef, setDomRect }) => {

  // Measures the current dimensions.
  const measure = useCallback(() => {
    setDomRect(wrapperRef.current.getBoundingClientRect());
  }, [wrapperRef, setDomRect]);

  // Measure the initial dimensions.
  //
  // The first measure should cause a synchronous re-render,
  // so we don't get a flash of incorrect dimensions.
  useLayoutEffect(() => {
    measure();
  }, [measure]);

  // Measure the dimensions on resize and on scroll.
  //
  // This stuff can't go inside useLayoutEffect, because
  // if it did, scrollerRef.current would not be defined yet.
  useEffect(() => {
    window.addEventListener('resize', measure);
    const scroller = scrollerRef.current;
    scroller.addEventListener('scroll', measure);

    return () => {
      window.removeEventListener('resize', measure);
      scroller.removeEventListener('scroll', measure);
    };
  }, [measure, scrollerRef]);
};
