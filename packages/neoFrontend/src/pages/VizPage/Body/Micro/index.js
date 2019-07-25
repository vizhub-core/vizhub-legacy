import React, { useRef, useContext, useCallback } from 'react';
import { SplitSVG, FullSVG } from '../../../../svg';
import { vizWidth } from '../../../../constants';
import { getVizHeight } from '../../../../accessors';
import { VizRunnerContext } from '../../VizRunnerContext';
import { VizPageDataContext } from '../../VizPageDataContext';
import { URLStateContext } from '../../URLStateContext';
import { useDimensions } from '../useDimensions';
import { LargeIcon, FrameFooter } from '../styles';
import { Wrapper } from './styles';
import { theme } from '../../../../theme';

// TODO derive from theme (banner height + head height);
const microHeight = 40 + 30;

// This is the viz display mode on mobile when the editor is open.
export const Micro = () => {
  const wrapperRef = useRef();

  const { setVizRunnerTransform } = useContext(VizRunnerContext);
  const { visualization } = useContext(VizPageDataContext);
  const vizHeight = getVizHeight(visualization);
  const scale = microHeight / vizHeight;
  const width = scale * vizWidth;

  const setDomRect = useCallback(
    ({ x, y }) => {
      setVizRunnerTransform({ x, y, scale });
    },
    [setVizRunnerTransform]
  );

  useDimensions({ wrapperRef, setDomRect, globalResize: true });

  return <Wrapper ref={wrapperRef} style={{ width }} />;
};
