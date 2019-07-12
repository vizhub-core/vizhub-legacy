import React from 'react';
import { NavBar } from '../../../NavBar';
import { Wrapper, TorsoWrapper, Torso, VizFrame, Bottom } from './styles';
import { Head } from './Head';

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
