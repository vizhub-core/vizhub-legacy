import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { AttentionGrabbingTitle, Centered, Subtitle } from './styles';
import { Wrapper, Content } from '../styles';
import { CreateVizPageDataProvider } from './CreateVizPageDataContext';
import { NavBar } from '../../NavBar';
import { FromScratchSection } from './FromScratchSection';

export const CreateVizPage = () => (
  <CreateVizPageDataProvider fallback={<LoadingScreen />}>
    <Wrapper>
      <Content>
        <NavBar />
        <Centered>
          <AttentionGrabbingTitle>
            Create a Visualization!
          </AttentionGrabbingTitle>
          <Subtitle>
            Create a new visualization from a VizHub template or fork one from
            our users.
          </Subtitle>
          <FromScratchSection />
        </Centered>
      </Content>
    </Wrapper>
  </CreateVizPageDataProvider>
);
