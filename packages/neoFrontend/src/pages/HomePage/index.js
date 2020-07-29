import React from 'react';
import { showSortOptions } from '../../featureFlags';
import { LoadingScreen } from '../../LoadingScreen';
import { NavBar } from '../../NavBar';
import { useVizzesSort } from '../../VizzesGrid/VizzesSortForm';
import { Wrapper, Content } from '../styles';
import { HomePageDataProvider } from './HomePageDataContext';
import { Vizzes } from './Vizzes';
import { Banner } from './Banner';
import { Sort } from './Sort';
import { HtmlStylesOverride } from './styles';

export const HomePage = () => {
  const [sort, handleSortChange] = useVizzesSort();

  return (
    <>
      <HtmlStylesOverride />
      <HomePageDataProvider sort={sort} fallback={<LoadingScreen />}>
        <NavBar isHomePage={true} showSearch />
        <Wrapper>
          <Content>
            <Banner />
            {showSortOptions ? (
              <Sort value={sort} onChange={handleSortChange} />
            ) : null}
            <Vizzes />
          </Content>
        </Wrapper>
      </HomePageDataProvider>
    </>
  );
};
