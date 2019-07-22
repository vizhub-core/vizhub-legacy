import React, { useContext, useRef } from 'react';
import { getVizHeight } from '../../../../accessors';
import { VizPageDataContext } from '../../VizPageDataContext';
import { Scroller, Centering, ViewerContent, HorizontalRule } from './styles';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';

export const Viewer = ({ onEnterFullScreen }) => {
  const {
    visualization,
    ownerUser,
    forkedFromVisualizationInfo,
    forkedFromVisualizationOwnerUserName
  } = useContext(VizPageDataContext);

  const vizHeight = getVizHeight(visualization);

  const scrollerRef = useRef();

  return (
    <Scroller ref={scrollerRef}>
      <Centering>
        <ViewerContent>
          <VizFrame
            vizHeight={vizHeight}
            onEnterFullScreen={onEnterFullScreen}
            scrollerRef={scrollerRef}
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
          />
          <HorizontalRule />
        </ViewerContent>
      </Centering>
    </Scroller>
  );
};
