import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content } from '../styles';
import { CreateVizPageDataProvider } from './CreateVizPageDataContext';
import { NavBar } from '../../NavBar';

export const CreateVizPage = () => (
  <CreateVizPageDataProvider fallback={<LoadingScreen />}>
    <Wrapper>
      <Content>
        <NavBar />
        Create a Visualization!
      </Content>
    </Wrapper>
  </CreateVizPageDataProvider>
);
