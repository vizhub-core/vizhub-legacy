import React, { useRef, useContext, useCallback, useState } from 'react';
import { MiniSVG, FullSVG } from '../../../../../svg';
import { vizWidth } from '../../../../../constants';
import { VizRunnerContext } from '../../../VizRunnerContext';
import { URLStateContext } from '../../../URLStateContext';
import { useDimensions } from '../../useDimensions';
import { FooterIcon, FrameFooter } from '../../styles';
import { Wrapper } from './styles';

export const VizFrame = ({ vizHeight, scrollerRef }) => {
  const wrapperRef = useRef();

  const { setVizRunnerTransform } = useContext(VizRunnerContext);
  const { enterFullScreen, enterMini } = useContext(URLStateContext);

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
          <FrameFooter>
            <FooterIcon leftmost={true} onClick={enterMini}>
              <MiniSVG />
            </FooterIcon>
            <FooterIcon rightmost={true} onClick={enterFullScreen}>
              <FullSVG />
            </FooterIcon>
          </FrameFooter>
        </>
      ) : null}
    </Wrapper>
  );
};
