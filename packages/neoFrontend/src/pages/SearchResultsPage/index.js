import React from 'react';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Centering } from '../styles';
import { SearchResultsPageDataProvider } from './SearchResultsPageDataContext';
import { NavBar } from '../../NavBar';
import { Vizzes } from './Vizzes';

export const SearchResultsPage = () => (
  <SearchResultsPageDataProvider fallback={<LoadingScreen />}>
    <Wrapper>
      <Content>
        <NavBar showSearch />
        <Centering>
          <Vizzes />
        </Centering>
      </Content>
    </Wrapper>
  </SearchResultsPageDataProvider>
);
