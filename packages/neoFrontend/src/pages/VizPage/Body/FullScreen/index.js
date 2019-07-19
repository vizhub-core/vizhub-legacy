import React, { useRef, useContext, useCallback } from 'react';
import { MiniSVG, FullSVG } from '../../../../svg';
import { vizWidth, defaultVizHeight } from '../../../../constants';
import { VizRunnerContext } from '../../VizRunnerContext';
import { useDimensions } from '../useDimensions';
import { FooterIcon } from '../styles';
import { Wrapper, FullScreenFooter } from './styles';

// TODO make sizing and scaling correct.
export const FullScreen = ({
  onExitFullScreen,
  vizHeight = defaultVizHeight
}) => {
  const wrapperRef = useRef();
  const { setVizRunnerTransform } = useContext(VizRunnerContext);

  const setDomRect = useCallback(
    ({ x, y, width }) => {
      const scale = width / vizWidth;
      setVizRunnerTransform({ x, y, scale });
    },
    [setVizRunnerTransform]
  );

  useDimensions({ wrapperRef, setDomRect });

  return (
    <Wrapper ref={wrapperRef}>
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
