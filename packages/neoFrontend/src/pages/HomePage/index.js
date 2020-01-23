import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Centering } from '../styles';
import { HomePageDataProvider } from './HomePageDataContext';
import { NavBar } from '../../NavBar';
import { Banner } from './Banner';
import { Vizzes } from './Vizzes';

export const HomePage = () => (
  <HomePageDataProvider fallback={<LoadingScreen />}>
    <Wrapper>
      <Content>
        <NavBar isHomePage={true} />
        <Banner />
        <Centering>
          <Vizzes />
        </Centering>
      </Content>
    </Wrapper>
  </HomePageDataProvider>
);
