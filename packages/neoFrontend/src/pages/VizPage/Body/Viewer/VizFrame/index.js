import React, { useRef, useContext, useCallback, useState } from 'react';
import { vizWidth } from 'vizhub-presenters';
import {
  enterFullScreenTooltip,
  enterMiniModeTooltip,
} from '../../../../../constants';
import { FullSVG } from '../../../../../svg';
import { MiniOrMicroSVG } from '../../../../../mobileMods';
import { SavingIndicator } from '../../../../../SavingIndicator';
import { LargeIcon } from '../../../../styles';
import { URLStateContext } from '../../../URLStateContext';
import { VizRunnerContext } from '../../../VizRunnerContext';
import { useDimensions } from '../../useDimensions';
import { PlayPauseControl } from '../../PlayPauseControl';
import { FrameFooter, FrameFooterRight } from '../../styles';
import { Wrapper, LargeIconRightmost } from './styles';

export const VizFrame = ({ vizHeight, scrollerRef, setWidth }) => {
  const wrapperRef = useRef();

  const { pending, hasLocalChanges, setVizRunnerTransform } = useContext(VizRunnerContext);
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
    // This guard prevents a crash when navigating between viz pages.
    // The root cause is that a resize event is fired on navigation,
    // before the useEffect cleanup hook runs.
    if (wrapperRef.current) {
      setWidth(wrapperRef.current.clientWidth);
    }
  }, [setWidth]);

  useDimensions({ wrapperRef, scrollerRef, setDomRect, onWidthChanged });

  return (
    <Wrapper ref={wrapperRef}>
      {scale ? (
        <>
          <div style={{ height: vizHeight * scale }} />
          <FrameFooter>
            <PlayPauseControl />
            {hasLocalChanges && <SavingIndicator saving={pending} />}
            <FrameFooterRight>
              <LargeIcon
                leftmost={true}
                onClick={enterMini}
                className="test-enter-mini-from-viewer"
                title={enterMiniModeTooltip}
              >
                <MiniOrMicroSVG />
              </LargeIcon>
              <LargeIconRightmost
                rightmost={true}
                onClick={enterFullScreen}
                className="test-enter-fullscreen-from-viewer"
                title={enterFullScreenTooltip}
              >
                <FullSVG />
              </LargeIconRightmost>
            </FrameFooterRight>
          </FrameFooter>
        </>
      ) : null}
    </Wrapper>
  );
};
