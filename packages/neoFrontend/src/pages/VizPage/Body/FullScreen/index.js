import React, { useRef, useContext, useCallback, useEffect } from 'react';
import { getVizHeight, vizWidth } from 'vizhub-presenters';
import { FullExitSVG } from '../../../../svg';
import { MiniOrMicroSVG } from '../../../../mobileMods';
import {
  exitFullScreenTooltip,
  enterMiniModeTooltip,
} from '../../../../constants';
import { useValue } from '../../../../useValue';
import { LargeIcon } from '../../../styles';
import { VizRunnerContext } from '../../VizRunnerContext';
import { URLStateContext } from '../../URLStateContext';
import { VizContext } from '../../VizContext';
import { useDimensions } from '../useDimensions';
import { Wrapper, FullScreenFooter, Backdrop } from './styles';

export const FullScreen = () => {
  const wrapperRef = useRef();
  const { setVizRunnerTransform } = useContext(VizRunnerContext);

  const { exitFullScreen, enterMini } = useContext(URLStateContext);

  const { viz$ } = useContext(VizContext);
  const vizHeight = useValue(viz$, getVizHeight);

  // Shrink and grow to fill available width and height.
  const setDomRect = useCallback(
    ({ width, height }) => {
      const vizAspect = vizWidth / vizHeight;
      const aspect = width / height;
      let x, y, scale;
      if (vizAspect > aspect) {
        scale = width / vizWidth;
        x = 0;
        y = height / 2 - (scale * vizHeight) / 2;
      } else {
        scale = height / vizHeight;
        x = width / 2 - (scale * vizWidth) / 2;
        y = 0;
      }
      setVizRunnerTransform({ x, y, scale });
    },
    [setVizRunnerTransform, vizHeight]
  );

  const measure = useDimensions({ wrapperRef, setDomRect, globalResize: true });

  // Measure when height changes, otherwise height gets out of sync.
  useEffect(() => {
    measure();
  }, [measure, vizHeight]);

  return (
    <>
      <Backdrop />
      <Wrapper ref={wrapperRef} className="test-fullscreen">
        <FullScreenFooter>
          <LargeIcon
            title={enterMiniModeTooltip}
            leftmost={true}
            onClick={enterMini}
          >
            <MiniOrMicroSVG />
          </LargeIcon>
          <LargeIcon
            rightmost={true}
            onClick={exitFullScreen}
            className="exit-fullscreen-from-fullscreen"
            title={exitFullScreenTooltip}
          >
            <FullExitSVG />
          </LargeIcon>
        </FullScreenFooter>
      </Wrapper>
    </>
  );
};
