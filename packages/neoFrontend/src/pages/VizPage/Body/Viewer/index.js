import React, { useContext, useRef, useState, useCallback } from 'react';
import { getVizHeight } from '../../../../accessors';
import { VizPageDataContext } from '../../VizPageDataContext';
import {
  Wrapper,
  Scroller,
  Centering,
  ViewerContent,
  HorizontalRule,
  Resizer
} from './styles';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';

export const Viewer = () => {
  const {
    visualization,
    ownerUser,
    forkedFromVisualizationInfo,
    forkedFromVisualizationOwnerUserName
  } = useContext(VizPageDataContext);

  const vizHeight = getVizHeight(visualization);

  const scrollerRef = useRef();

  // Breakpoints for responsive layout.
  const [size, setSize] = useState();
  const setWidth = useCallback(
    width => {
      setSize(width < 500 ? 'small' : width < 700 ? 'medium' : 'large');
    },
    [setSize]
  );

  return (
    <Wrapper>
      <Resizer />
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
