import React, {
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect
} from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

import { getVizHeight } from '../../../../accessors';
import { VizPageDataContext } from '../../VizPageDataContext';
import { useListener } from '../useListener';
import {
  Wrapper,
  Scroller,
  Centering,
  ViewerContent,
  HorizontalRule
} from './styles';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';
import { Resizer } from './Resizer';
import { GlobalScrollbarStyle } from './GlobalScrollbarStyle';

export const Viewer = () => {
  const {
    visualization,
    ownerUser,
    forkedFromVisualizationInfo,
    forkedFromVisualizationOwnerUserName
  } = useContext(VizPageDataContext);

  const vizHeight = getVizHeight(visualization);

  const scrollerRef = useRef();
  const perfectScrollbarRef = useRef();

  useEffect(() => {
    perfectScrollbarRef.current = new PerfectScrollbar(scrollerRef.current);
    return () => {
      perfectScrollbarRef.current.destroy();
      perfectScrollbarRef.current = undefined;
    };
  }, []);

  const updateScrollbar = useCallback(() => {
    if (perfectScrollbarRef.current) {
      perfectScrollbarRef.current.update();
    }
  }, []);

  useListener('resize', updateScrollbar, window);

  // Breakpoints for responsive layout.
  const [size, setSize] = useState();
  const setWidth = useCallback(
    width => {
      setSize(width < 500 ? 'small' : width < 700 ? 'medium' : 'large');
      updateScrollbar();
    },
    [setSize, updateScrollbar]
  );

  return (
    <Wrapper className="test-viewer">
      <Resizer />
      <GlobalScrollbarStyle />
      <Scroller ref={scrollerRef}>
        <Centering>
          <ViewerContent>
            <VizFrame
              vizHeight={vizHeight}
              scrollerRef={scrollerRef}
              setWidth={setWidth}
            />
            <TitleBar title={visualization.info.title} />
            <HorizontalRule />
            <DescriptionSection
              visualization={visualization}
              ownerUser={ownerUser}
              forkedFromVisualizationInfo={forkedFromVisualizationInfo}
              forkedFromVisualizationOwnerUserName={
                forkedFromVisualizationOwnerUserName
              }
              size={size}
            />
            <HorizontalRule />
          </ViewerContent>
        </Centering>
      </Scroller>
    </Wrapper>
  );
};
