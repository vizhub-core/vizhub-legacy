import React, { useRef, useContext, useCallback } from 'react';
import { SplitSVG, FullSVG } from '../../../../svg';
import {
  vizWidth,
  enterFullScreenTooltip,
  exitMiniModeTooltip
} from '../../../../constants';
import { getVizHeight } from '../../../../accessors';
import { theme } from '../../../../theme';
import { LargeIcon } from '../../../styles';
import { FrameFooter } from '../styles';
import { VizRunnerContext } from '../../VizRunnerContext';
import { VizPageDataContext } from '../../VizPageDataContext';
import { URLStateContext } from '../../URLStateContext';
import { useDimensions } from '../useDimensions';
import { Wrapper } from './styles';

const scale = theme.miniWidth / vizWidth;

export const Mini = () => {
  const wrapperRef = useRef();

  const { setVizRunnerTransform } = useContext(VizRunnerContext);
  const { enterFullScreen, exitMini } = useContext(URLStateContext);

  const { visualization } = useContext(VizPageDataContext);
  const vizHeight = getVizHeight(visualization);

  const setDomRect = useCallback(
    ({ x, y }) => {
      setVizRunnerTransform({ x, y, scale });
    },
    [setVizRunnerTransform]
  );

  useDimensions({ wrapperRef, setDomRect, globalResize: true });

  return (
    <Wrapper ref={wrapperRef} className="test-mini">
      <div style={{ height: vizHeight * scale }} />
      <FrameFooter>
        <LargeIcon
          leftmost={true}
          onClick={exitMini}
          className="exit-mini-from-mini"
          title={exitMiniModeTooltip}
        >
          <SplitSVG />
        </LargeIcon>
        <LargeIcon
          rightmost={true}
          onClick={enterFullScreen}
          title={enterFullScreenTooltip}
        >
          <FullSVG />
        </LargeIcon>
      </FrameFooter>
    </Wrapper>
  );
};
