import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content } from '../styles';
import { HomePageDataProvider } from './HomePageDataContext';
import { NavBar } from '../../NavBar';

export const HomePage = () => (
  <HomePageDataProvider fallback={<LoadingScreen />}>
    <Wrapper>
      <Content>
        <NavBar />
        Welcome to VizHub 2.0 beta! This software is work in progress. To report
        bugs or feature requests, please email curran@datavis.tech.
      </Content>
    </Wrapper>
  </HomePageDataProvider>
);
