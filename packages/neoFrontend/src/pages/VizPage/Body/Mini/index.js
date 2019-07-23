import React, { useRef, useContext, useCallback } from 'react';
import { SplitSVG, FullSVG } from '../../../../svg';
import { vizWidth } from '../../../../constants';
import { getVizHeight } from '../../../../accessors';
import { VizRunnerContext } from '../../VizRunnerContext';
import { VizPageDataContext } from '../../VizPageDataContext';
import { URLStateContext } from '../../URLStateContext';
import { useDimensions } from '../useDimensions';
import { FooterIcon, FrameFooter } from '../styles';
import { Wrapper } from './styles';
import { theme } from '../../../../theme';

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

  useDimensions({ wrapperRef, setDomRect });

  return (
    <Wrapper ref={wrapperRef}>
      <div style={{ height: vizHeight * scale }} />
      <FrameFooter>
        <FooterIcon leftmost={true} onClick={exitMini}>
          <SplitSVG />
        </FooterIcon>
        <FooterIcon rightmost={true} onClick={enterFullScreen}>
          <FullSVG />
        </FooterIcon>
      </FrameFooter>
    </Wrapper>
  );
};
