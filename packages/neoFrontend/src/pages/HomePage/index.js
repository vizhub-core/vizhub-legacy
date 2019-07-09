import React from 'react';
import { SVGGallery } from '../../svg';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content } from '../styles';
import { HomePageDataProvider } from './HomePageDataContext';
import { NavBar } from '../../NavBar';

export const HomePage = () => (
  <HomePageDataProvider fallback={<LoadingScreen />}>
    <Wrapper>
      <Content>
        <NavBar />
        <SVGGallery />
      </Content>
    </Wrapper>
  </HomePageDataProvider>
);
