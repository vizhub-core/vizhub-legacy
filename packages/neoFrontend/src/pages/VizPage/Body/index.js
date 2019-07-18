import React, { useContext, useRef, useState } from 'react';
import { NavBar } from '../../../NavBar';
import { VizPageDataContext } from '../VizPageDataContext';
import { ForkingContext } from '../ForkingContext';
import { Wrapper, Bottom, TorsoWrapper, Torso, HorizontalRule } from './styles';
import { Head } from './Head';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';
import { VizRunner } from './VizRunner';

export const Body = () => {
  const {
    visualization,
    ownerUser,
    forkedFromVisualizationInfo,
    forkedFromVisualizationOwnerUserName
  } = useContext(VizPageDataContext);

  const onFork = useContext(ForkingContext);

  const scrollerRef = useRef();

  const [vizRunnerRect, setVizRunnerRect] = useState();

  return (
    <>
      <Wrapper>
        <NavBar />
        <Head onFork={onFork} />
        <Bottom ref={scrollerRef}>
          <TorsoWrapper>
            <Torso>
              <VizFrame
                vizHeight={visualization.info.height}
                scrollerRef={scrollerRef}
                vizRunnerRect={vizRunnerRect}
                setVizRunnerRect={setVizRunnerRect}
              />
              <TitleBar title={visualization.title} />
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
      <VizRunner rect={vizRunnerRect} />
    </>
  );
};
