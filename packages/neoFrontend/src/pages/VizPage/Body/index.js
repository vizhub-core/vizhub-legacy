import React from 'react';
import { NavBar } from '../../../NavBar';
import { Wrapper, Bottom, TorsoWrapper, Torso, HorizontalRule } from './styles';
import { Head } from './Head';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';

export const Body = () => {
  return (
    <Wrapper>
      <NavBar />
      <Head />
      <Bottom>
        <TorsoWrapper>
          <Torso>
            <VizFrame />
            <TitleBar />
            <HorizontalRule />
            <DescriptionSection />
            <HorizontalRule />
          </Torso>
        </TorsoWrapper>
      </Bottom>
    </Wrapper>
  );
};
