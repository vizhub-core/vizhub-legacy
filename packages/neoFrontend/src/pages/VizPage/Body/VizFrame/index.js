import React, { useRef, useLayoutEffect, useState } from 'react';
import { MiniSVG, FullSVG } from '../../../../svg';
import { Footer, FooterIcon } from '../styles';
import { Wrapper } from './styles';
import { VizContent } from '../VizContent';

const vizWidth = 960;

export const VizFrame = ({ vizHeight = 500, onFullScreen }) => {
  const wrapperRef = useRef();
  const [width, setWidth] = useState();

  // Keep the content frame a fixed aspect ratio when resized.
  useLayoutEffect(() => {
    const measure = () => {
      const domRect = wrapperRef.current.getBoundingClientRect();
      setWidth(domRect.width);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      {width ? (
        <>
          <VizContent height={(vizHeight * width) / vizWidth} />
          <Footer>
            <FooterIcon leftmost={true}>
              <MiniSVG />
            </FooterIcon>
            <FooterIcon rightmost={true} onClick={onFullScreen}>
              <FullSVG />
            </FooterIcon>
          </Footer>
        </>
      ) : null}
    </Wrapper>
  );
};
