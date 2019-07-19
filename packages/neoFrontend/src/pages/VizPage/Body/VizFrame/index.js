import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
  useCallback,
  useState
} from 'react';
import { MiniSVG, FullSVG } from '../../../../svg';
import { vizWidth, defaultVizHeight } from '../../../../constants';
import { VizRunnerContext } from '../../VizRunnerContext';
import { VizContent } from '../VizContent';
import { Footer, FooterIcon } from '../styles';
import { Wrapper } from './styles';

const useDimensions = ({ wrapperRef, scrollerRef, setDomRect }) => {
  // Measures the current dimensions.
  const measure = useCallback(() => {
    setDomRect(wrapperRef.current.getBoundingClientRect());
  }, [wrapperRef, setDomRect]);

  // Measure the initial dimensions.
  //
  // The first measure should cause a synchronous re-render,
  // so we don't get a flash of incorrect dimensions.
  useLayoutEffect(() => {
    measure();
  }, [measure]);

  // Measure the dimensions on resize and on scroll.
  //
  // This stuff can't go inside useLayoutEffect, because
  // if it did, scrollerRef.current would not be defined yet.
  useEffect(() => {
    window.addEventListener('resize', measure);
    const scroller = scrollerRef.current;
    scroller.addEventListener('scroll', measure);

    return () => {
      window.removeEventListener('resize', measure);
      scroller.removeEventListener('scroll', measure);
    };
  }, [measure, scrollerRef]);
};

export const VizFrame = ({
  vizHeight = defaultVizHeight,
  scrollerRef,
  onFullScreen
}) => {
  const wrapperRef = useRef();

  const { setVizRunnerTransform } = useContext(VizRunnerContext);

  const [scale, setScale] = useState();

  const setDomRect = useCallback(
    domRect => {
      const newScale = domRect.width / vizWidth;
      setScale(newScale);
      //setVizRunnerPosition(
      setVizRunnerTransform({
        x: domRect.x,
        y: domRect.y,
        scale: newScale
      });
    },
    [setVizRunnerTransform, setScale]
  );

  useDimensions({ wrapperRef, scrollerRef, setDomRect });

  return (
    <Wrapper ref={wrapperRef}>
      {scale ? (
        <>
          <VizContent height={vizHeight * scale} />
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
