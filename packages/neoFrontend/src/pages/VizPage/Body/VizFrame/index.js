import React, { useRef, useEffect, useCallback } from 'react';
import { Wrapper, Content, Footer, FooterIcon } from './styles';
import { MiniSVG, FullSVG } from '../../../../svg';

const vizWidth = 960;

export const VizFrame = ({
  vizHeight = 500,
  scrollerRef,
  vizRunnerRect,
  setVizRunnerRect
}) => {
  const wrapperRef = useRef();

  const measure = useCallback(() => {
    const domRect = wrapperRef.current.getBoundingClientRect();

    const x = domRect.left;
    const y = domRect.top;
    const width = domRect.width;
    const height = (vizHeight * domRect.width) / vizWidth;

    setVizRunnerRect({ x, y, width, height });
  }, [setVizRunnerRect, vizHeight]);

  useEffect(() => {
    window.addEventListener('resize', measure);

    const scroller = scrollerRef.current;
    scroller.addEventListener('scroll', measure);

    // Measure the initial width.
    measure();

    // Handle the case that the initial measure caused
    // the vertical scrollbar on the right to appear.
    requestAnimationFrame(measure);

    return () => {
      window.removeEventListener('resize', measure);
      scroller.addEventListener('scroll', measure);
    };
  }, [scrollerRef, setVizRunnerRect, vizHeight, measure]);


  return (
    <Wrapper ref={wrapperRef}>
      {vizRunnerRect ? <Content height={vizRunnerRect.height} /> : null}
      <Footer>
        <FooterIcon leftmost={true}>
          <MiniSVG />
        </FooterIcon>
        <FooterIcon rightmost={true}>
          <FullSVG />
        </FooterIcon>
      </Footer>
    </Wrapper>
  );
};
