import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Centering, Text } from '../styles';
import { HomePageDataProvider } from './HomePageDataContext';
import { NavBar } from '../../NavBar';

export const HomePage = () => (
  <HomePageDataProvider fallback={<LoadingScreen />}>
    <Wrapper>
      <Content>
        <NavBar />
        <Centering>
          <Text>
            <h1>Welcome to VizHub 2.0 beta!</h1>
            <p>
              To report bugs or feature requests, or to ask for help, please
              check out our <a href="https://discourse.vizhub.com">user forum</a>.
            </p>
          </Text>
        </Centering>
      </Content>
    </Wrapper>
  </HomePageDataProvider>
);
