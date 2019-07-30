import React, { useRef, useContext, useCallback, useState } from 'react';
import { FullSVG } from '../../../../../svg';
import { MiniOrMicroSVG } from '../../../../../mobileMods';
import { vizWidth } from '../../../../../constants';
import { VizRunnerContext } from '../../../VizRunnerContext';
import { URLStateContext } from '../../../URLStateContext';
import { useDimensions } from '../../useDimensions';
import { LargeIcon, FrameFooter } from '../../styles';
import { Wrapper } from './styles';

export const VizFrame = ({ vizHeight, scrollerRef, setWidth }) => {
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

  const onWidthChanged = useCallback(() => {
    setWidth(wrapperRef.current.clientWidth);
  }, [setWidth]);

  useDimensions({ wrapperRef, scrollerRef, setDomRect, onWidthChanged });

  return (
    <Wrapper ref={wrapperRef}>
      {scale ? (
        <>
          <div style={{ height: vizHeight * scale }} />
          <FrameFooter>
            <LargeIcon
              leftmost={true}
              onClick={enterMini}
              className="test-enter-mini-from-viewer"
            >
              <MiniOrMicroSVG />
            </LargeIcon>
            <LargeIcon
              rightmost={true}
              onClick={enterFullScreen}
              className="test-enter-fullscreen-from-viewer"
            >
              <FullSVG />
            </LargeIcon>
          </FrameFooter>
        </>
      ) : null}
    </Wrapper>
  );
};
