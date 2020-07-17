import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Centering } from '../styles';
import { PageDataProvider } from './PageDataContext';
import { NavBar } from '../../NavBar';
import { Vizzes } from './Vizzes';

export const SearchResultsPage = () => (
  <PageDataProvider fallback={<LoadingScreen />}>
    <NavBar showSearch />
    <Wrapper>
      <Content>
        <Centering>
          <Vizzes />
        </Centering>
      </Content>
    </Wrapper>
  </PageDataProvider>
);
