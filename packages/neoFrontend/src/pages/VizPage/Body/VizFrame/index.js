import React, { useRef, useState, useLayoutEffect } from 'react';
import { Wrapper, Content, Footer, FooterIcon } from './styles';
import { MiniSVG, FullSVG } from '../../../../svg';

const vizWidth = 960;

export const VizFrame = ({ visualization }) => {
  const vizHeight = visualization.info.height || 500;
  const ref = useRef();
  const [width, setWidth] = useState();

  const vizScale = width / vizWidth;

  useLayoutEffect(() => {
    const measureWidth = () => {
      setWidth(ref.current.clientWidth);
    };
    measureWidth();
    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, []);

  return (
    <Wrapper ref={ref}>
      {width ? <Content height={vizHeight * vizScale} /> : null}
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
