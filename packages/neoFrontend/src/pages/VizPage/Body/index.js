import React from 'react';
import { NavBar } from '../../../NavBar';
import { Wrapper, Bottom, TorsoWrapper, Torso } from './styles';
import { Head } from './Head';
import { VizFrame } from './VizFrame';

export const Body = () => {
  return (
    <Wrapper>
      <NavBar />
      <Head />
      <Bottom>
        <TorsoWrapper>
          <Torso>
            <VizFrame />
          </Torso>
        </TorsoWrapper>
      </Bottom>
    </Wrapper>
  );
};
