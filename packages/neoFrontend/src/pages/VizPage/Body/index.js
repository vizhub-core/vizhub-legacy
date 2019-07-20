import React, { useContext, useState, useCallback, useRef } from 'react';
import { NavBar } from '../../../NavBar';
import { VizPageDataContext } from '../VizPageDataContext';
import { URLStateContext } from '../URLStateContext';
import { ForkingContext } from '../ForkingContext';
import {
  Wrapper,
  Top,
  Bottom,
  VizViewer,
  TorsoWrapper,
  Torso,
  HorizontalRule
} from './styles';
import { Head } from './Head';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';
import { FullScreen } from './FullScreen';
import { Editor } from './Editor';

export const Body = () => {
  const {
    visualization,
    ownerUser,
    forkedFromVisualizationInfo,
    forkedFromVisualizationOwnerUserName
  } = useContext(VizPageDataContext);

  const onFork = useContext(ForkingContext);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onFullScreen = useCallback(() => {
    setIsFullScreen(true);
  }, [setIsFullScreen]);

  const onExitFullScreen = useCallback(() => {
    setIsFullScreen(false);
  }, [setIsFullScreen]);

  const scrollerRef = useRef();

  const vizHeight = visualization.info.height;

  const { showEditor } = useContext(URLStateContext);

  return isFullScreen ? (
    <FullScreen onExitFullScreen={onExitFullScreen} vizHeight={vizHeight} />
  ) : (
    <Wrapper>
      <Top>
        <NavBar />
        <Head onFork={onFork} />
      </Top>
      <Bottom>
        {showEditor ? <Editor files={visualization.content.files} /> : null}
        <VizViewer ref={scrollerRef}>
          <TorsoWrapper>
            <Torso>
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
            </Torso>
          </TorsoWrapper>
        </VizViewer>
      </Bottom>
    </Wrapper>
  );
};
