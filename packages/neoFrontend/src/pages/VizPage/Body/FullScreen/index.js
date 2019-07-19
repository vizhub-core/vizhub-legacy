import React, { useRef, useContext, useCallback } from 'react';
import { MiniSVG, FullSVG } from '../../../../svg';
import { vizWidth, defaultVizHeight } from '../../../../constants';
import { VizRunnerContext } from '../../VizRunnerContext';
import { useDimensions } from '../useDimensions';
import { FooterIcon } from '../styles';
import { Wrapper, FullScreenFooter } from './styles';
import { VizContent } from '../VizContent';

// TODO useDimensions and make sizing and scaling correct.
export const FullScreen = ({
  onExitFullScreen,
  vizHeight = defaultVizHeight
}) => {
  const wrapperRef = useRef();
  const { setVizRunnerTransform } = useContext(VizRunnerContext);

  const setDomRect = useCallback(
    domRect => {
      setVizRunnerTransform({
        x: domRect.x,
        y: domRect.y,
        scale: domRect.width / vizWidth
      });
    },
    [setVizRunnerTransform]
  );

  useDimensions({ wrapperRef, setDomRect });

  return (
    <Wrapper ref={wrapperRef}>
      <VizContent height={500} />
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
