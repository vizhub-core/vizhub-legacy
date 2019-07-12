import React from 'react';
import { NavBar } from '../../../NavBar';
import {
  Wrapper,
  Bottom,
  TorsoWrapper,
  Torso,
  VizFrame,
  VizFrameContent,
  VizFrameFooter
} from './styles';
import { Head } from './Head';

export const Body = () => {
  return (
    <Wrapper>
      <NavBar />
      <Head />
      <Bottom>
        <TorsoWrapper>
          <Torso>
            <VizFrame>
              <VizFrameContent />
              <VizFrameFooter />
            </VizFrame>
          </Torso>
        </TorsoWrapper>
      </Bottom>
    </Wrapper>
  );
};
