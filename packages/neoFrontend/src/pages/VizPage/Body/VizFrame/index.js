import React, {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useContext
} from 'react';
import { MiniSVG, FullSVG } from '../../../../svg';
import { VizRunnerContext } from '../../VizRunnerContext';
import { Footer, FooterIcon } from '../styles';
import { Wrapper, Content } from './styles';

const vizWidth = 960;

export const VizFrame = ({ vizHeight = 500, onFullScreen }) => {
  const wrapperRef = useRef();
  const contentRef = useRef();
  const [width, setWidth] = useState();
  const { vizRunnerIFrame } = useContext(VizRunnerContext);

  // Keep the content frame a fixed aspect ratio when resized.
  useLayoutEffect(() => {
    const measure = () => {
      const domRect = wrapperRef.current.getBoundingClientRect();
      setWidth(domRect.width);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    if (width) {
      const content = contentRef.current;
      content.appendChild(vizRunnerIFrame);
      return () => {
        content.removeChild(vizRunnerIFrame);
      };
    }
  }, [vizRunnerIFrame, width]);

  return (
    <Wrapper ref={wrapperRef}>
      {width ? (
        <Content ref={contentRef} height={(vizHeight * width) / vizWidth} />
      ) : null}
      <Footer>
        <FooterIcon leftmost={true}>
          <MiniSVG />
        </FooterIcon>
        <FooterIcon rightmost={true} onClick={onFullScreen}>
          <FullSVG />
        </FooterIcon>
      </Footer>
    </Wrapper>
  );
};
