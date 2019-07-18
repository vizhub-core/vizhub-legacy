import React, { useRef, useLayoutEffect, useState } from 'react';
import { Wrapper, Content, Footer, FooterIcon } from './styles';
import { MiniSVG, FullSVG } from '../../../../svg';

const vizWidth = 960;

export const VizFrame = ({ vizHeight = 500 }) => {
  const wrapperRef = useRef();
  const [width, setWidth] = useState();

  useLayoutEffect(() => {
    const measure = () => {
      const domRect = wrapperRef.current.getBoundingClientRect();
      setWidth(domRect.width);
    };

    // Measure the initial width.
    measure();

    // Measure again on each resize.
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      {width ? <Content height={(vizHeight * width) / vizWidth} /> : null}
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
