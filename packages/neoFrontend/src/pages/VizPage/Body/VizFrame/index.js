import React, { useRef, useContext, useCallback, useState } from 'react';
import { MiniSVG, FullSVG } from '../../../../svg';
import { vizWidth, defaultVizHeight } from '../../../../constants';
import { VizRunnerContext } from '../../VizRunnerContext';
import { VizContent } from '../VizContent';
import { useDimensions } from '../useDimensions';
import { Footer, FooterIcon } from '../styles';
import { Wrapper } from './styles';

export const VizFrame = ({
  vizHeight = defaultVizHeight,
  scrollerRef,
  onFullScreen
}) => {
  const wrapperRef = useRef();

  const { setVizRunnerTransform } = useContext(VizRunnerContext);

  const [scale, setScale] = useState();

  const setDomRect = useCallback(
    domRect => {
      const newScale = domRect.width / vizWidth;
      setScale(newScale);
      setVizRunnerTransform({
        x: domRect.x,
        y: domRect.y,
        scale: newScale
      });
    },
    [setVizRunnerTransform, setScale]
  );

  useDimensions({ wrapperRef, scrollerRef, setDomRect });

  return (
    <Wrapper ref={wrapperRef}>
      {scale ? (
        <>
          <VizContent height={vizHeight * scale} />
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
