import React, { useRef, useContext, useCallback } from 'react';
import { MiniSVG, FullSVG } from '../../../../svg';
import { vizWidth, defaultVizHeight } from '../../../../constants';
import { VizRunnerContext } from '../../VizRunnerContext';
import { useDimensions } from '../useDimensions';
import { FooterIcon } from '../styles';
import { Wrapper, FullScreenFooter } from './styles';

export const FullScreen = ({
  onExitFullScreen,
  vizHeight = defaultVizHeight
}) => {
  const wrapperRef = useRef();
  const { setVizRunnerTransform } = useContext(VizRunnerContext);

  // Shrink and grow to fill available width and height.
  const setDomRect = useCallback(
    ({ width, height }) => {
      const vizAspect = vizWidth / vizHeight;
      const aspect = width / height;
      if (vizAspect > aspect) {
        const scale = width / vizWidth;
        setVizRunnerTransform({
          x: 0,
          y: height / 2 - (scale * vizHeight) / 2,
          scale,
          mode: 'fullscreen'
        });
      } else {
        const scale = height / vizHeight;
        setVizRunnerTransform({
          x: width / 2 - (scale * vizWidth) / 2,
          y: 0,
          scale
        });
      }
    },
    [setVizRunnerTransform, vizHeight]
  );

  useDimensions({ wrapperRef, setDomRect });

  return (
    <Wrapper ref={wrapperRef}>
      <FullScreenFooter>
        <FooterIcon leftmost={true}>
          <MiniSVG />
        </FooterIcon>
        <FooterIcon rightmost={true} onClick={onExitFullScreen}>
          <FullSVG />
        </FooterIcon>
      </FullScreenFooter>
    </Wrapper>
  );
};
