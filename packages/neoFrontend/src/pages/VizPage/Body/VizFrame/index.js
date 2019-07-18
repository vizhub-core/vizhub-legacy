import React, { useRef, useLayoutEffect, useContext } from 'react';
import { MiniSVG, FullSVG } from '../../../../svg';
import { vizWidth, defaultVizHeight } from '../../../../constants';
import { VizRunnerContext } from '../../VizRunnerContext';
import { VizContent } from '../VizContent';
import { Footer, FooterIcon } from '../styles';
import { Wrapper } from './styles';

export const VizFrame = ({ vizHeight = defaultVizHeight, onFullScreen }) => {
  const wrapperRef = useRef();

  const { vizRunnerTransform, setVizRunnerTransform } = useContext(
    VizRunnerContext
  );

  // Keep the content frame a fixed aspect ratio when resized.
  useLayoutEffect(() => {
    const measure = () => {
      const domRect = wrapperRef.current.getBoundingClientRect();

      //setVizRunnerPosition(
      setVizRunnerTransform({
        x: domRect.x,
        y: domRect.y,
        scale: domRect.width / vizWidth
      });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
    };
  }, [setVizRunnerTransform]);

  return (
    <Wrapper ref={wrapperRef}>
      <VizContent height={vizHeight * vizRunnerTransform.scale} />
      <Footer>
        <FooterIcon leftmost={true}>
          <MiniSVG />
        </FooterIcon>
        <FooterIcon rightmost={true} onClick={onFullScreen}>
          <FullSVG />
        </FooterIcon>
      </Footer>
    </Wrapper>
  );
};
