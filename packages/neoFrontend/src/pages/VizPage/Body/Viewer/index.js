import React, { useContext, useRef } from 'react';
import { getVizHeight } from '../../../../accessors';
import { VizPageDataContext } from '../../VizPageDataContext';
import {
  VizViewerScroller,
  VizViewerCentering,
  VizViewerContent,
  HorizontalRule
} from '../styles';
import { VizFrame } from '../VizFrame';
import { TitleBar } from '../TitleBar';
import { DescriptionSection } from '../DescriptionSection';

export const Viewer = ({ onFullScreen }) => {
  const {
    visualization,
    ownerUser,
    forkedFromVisualizationInfo,
    forkedFromVisualizationOwnerUserName
  } = useContext(VizPageDataContext);

  const vizHeight = getVizHeight(visualization);

  const scrollerRef = useRef();

  return (
    <VizViewerScroller ref={scrollerRef}>
      <VizViewerCentering>
        <VizViewerContent>
          <VizFrame
            vizHeight={vizHeight}
            onFullScreen={onFullScreen}
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
        </VizViewerContent>
      </VizViewerCentering>
    </VizViewerScroller>
  );
};
