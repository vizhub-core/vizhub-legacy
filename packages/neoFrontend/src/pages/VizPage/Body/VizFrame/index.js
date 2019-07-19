import React, { useRef, useContext, useCallback, useState } from 'react';
import { MiniSVG, FullSVG } from '../../../../svg';
import { vizWidth, defaultVizHeight } from '../../../../constants';
import { VizRunnerContext } from '../../VizRunnerContext';
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
