import React, { useContext, useState, useCallback, useRef } from 'react';
import { getVizHeight } from '../../../accessors';
import { NavBar } from '../../../NavBar';
import { VizPageDataContext } from '../VizPageDataContext';
import { URLStateContext } from '../URLStateContext';
import { ForkingContext } from '../ForkingContext';
import {
  Wrapper,
  Top,
  Bottom,
  VizViewerScroller,
  VizViewerCentering,
  VizViewerContent,
  HorizontalRule
} from './styles';
import { Head } from './Head';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';
import { FullScreen } from './FullScreen';
import { Editor } from './Editor';

const VizViewer = ({ onFullScreen }) => {
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

export const Body = () => {
  const onFork = useContext(ForkingContext);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onFullScreen = useCallback(() => {
    setIsFullScreen(true);
  }, [setIsFullScreen]);

  const onExitFullScreen = useCallback(() => {
    setIsFullScreen(false);
  }, [setIsFullScreen]);

  const { showEditor } = useContext(URLStateContext);

  return isFullScreen ? (
    <FullScreen onExitFullScreen={onExitFullScreen} />
  ) : (
    <Wrapper>
      <Top>
        <NavBar />
        <Head onFork={onFork} />
      </Top>
      <Bottom>
        {showEditor ? <Editor /> : null}
        <VizViewer onFullScreen={onFullScreen} />
      </Bottom>
    </Wrapper>
  );
};
