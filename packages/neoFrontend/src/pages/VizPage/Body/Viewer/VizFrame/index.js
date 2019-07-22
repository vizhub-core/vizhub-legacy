import React, { useRef, useContext, useCallback, useState } from 'react';
import { MiniSVG, FullSVG } from '../../../../../svg';
import { vizWidth, defaultVizHeight } from '../../../../../constants';
import { VizRunnerContext } from '../../../VizRunnerContext';
import { useDimensions } from '../../useDimensions';
import { FooterIcon } from '../../styles';
import { Wrapper, VizFrameFooter } from './styles';

export const VizFrame = ({
  vizHeight = defaultVizHeight,
  scrollerRef,
  onEnterFullScreen
}) => {
  const wrapperRef = useRef();

  const { setVizRunnerTransform } = useContext(VizRunnerContext);

  const [scale, setScale] = useState();

  const setDomRect = useCallback(
    ({ x, y, width }) => {
      const scale = width / vizWidth;
      setScale(scale);
      setVizRunnerTransform({ x, y, scale });
    },
    [setVizRunnerTransform, setScale]
  );

  useDimensions({ wrapperRef, scrollerRef, setDomRect });

  return (
    <Wrapper ref={wrapperRef}>
      {scale ? (
        <>
          <div style={{ height: vizHeight * scale }} />
          <VizFrameFooter>
            <FooterIcon leftmost={true}>
              <MiniSVG />
            </FooterIcon>
            <FooterIcon rightmost={true} onClick={onEnterFullScreen}>
              <FullSVG />
            </FooterIcon>
          </VizFrameFooter>
        </>
      ) : null}
    </Wrapper>
  );
};
