import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Centering } from '../styles';
import { HomePageDataProvider } from './HomePageDataContext';
import { NavBar } from '../../NavBar';
import { Vizzes } from './Vizzes';

//import { Banner } from './Banner';
//        <Banner />

export const HomePage = () => (
  <HomePageDataProvider fallback={<LoadingScreen />}>
    <Wrapper>
      <Content>
        <NavBar isHomePage={true} showSearch />
        <Centering>
          <Vizzes />
        </Centering>
      </Content>
    </Wrapper>
  </HomePageDataProvider>
);
