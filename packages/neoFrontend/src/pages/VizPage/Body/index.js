import React, { useContext, useState, useCallback, useRef } from 'react';
import { NavBar } from '../../../NavBar';
import { VizPageDataContext } from '../VizPageDataContext';
import { ForkingContext } from '../ForkingContext';
import {
  Wrapper,
  Top,
  Bottom,
  TorsoWrapper,
  Torso,
  HorizontalRule
} from './styles';
import { Head } from './Head';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';
import { FullScreen } from './FullScreen';

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

  return isFullScreen ? (
    <FullScreen onExitFullScreen={onExitFullScreen} vizHeight={vizHeight} />
  ) : (
    <Wrapper>
      <Top>
        <NavBar />
        <Head onFork={onFork} />
      </Top>
      <Bottom ref={scrollerRef}>
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
      </Bottom>
    </Wrapper>
  );
};
