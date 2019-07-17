import React, { useContext } from 'react';
import { NavBar } from '../../../NavBar';
import { VizPageDataContext } from '../VizPageDataContext';
import { ForkingContext } from '../ForkingContext';
import { Wrapper, Bottom, TorsoWrapper, Torso, HorizontalRule } from './styles';
import { Head } from './Head';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';

export const Body = () => {
  const { visualization, ownerUser, forkedFromVisualizationInfo } = useContext(
    VizPageDataContext
  );
  const onFork = useContext(ForkingContext);

  return (
    <Wrapper>
      <NavBar />
      <Head onFork={onFork} />
      <Bottom>
        <TorsoWrapper>
          <Torso>
            <VizFrame />
            <TitleBar title={visualization.title} />
            <HorizontalRule />
            <DescriptionSection
              visualization={visualization}
              ownerUser={ownerUser}
              forkedFromVisualizationInfo={forkedFromVisualizationInfo}
            />
            <HorizontalRule />
          </Torso>
        </TorsoWrapper>
      </Bottom>
    </Wrapper>
  );
};
