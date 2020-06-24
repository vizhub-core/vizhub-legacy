import React, { useState } from 'react';
import { showSortOptions } from '../../featureFlags';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper, Content, Centering } from '../styles';
import { HomePageDataProvider } from './HomePageDataContext';
import { NavBar } from '../../NavBar';
import { Vizzes } from './Vizzes';
import { Banner } from './Banner';
import { Sort } from './Sort';

export const HomePage = () => {
  const [sort, setSort] = useState('lastUpdatedTimestamp');

  return (
    <HomePageDataProvider sort={sort} fallback={<LoadingScreen />}>
      <Wrapper>
        <Content>
          <NavBar isHomePage={true} showSearch />
          <Banner />
          {showSortOptions ? <Sort value={sort} onChange={setSort} /> : null}
          <Centering>
            <Vizzes />
          </Centering>
        </Content>
      </Wrapper>
    </HomePageDataProvider>
  );
};
