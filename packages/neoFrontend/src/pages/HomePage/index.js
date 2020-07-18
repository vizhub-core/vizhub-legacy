import React, { useCallback } from 'react';
import { VIZ_INFO_DEFAULT_SORT_OPTION } from 'vizhub-entities';
import { showSortOptions } from '../../featureFlags';
import { LoadingScreen } from '../../LoadingScreen';
import { useSearchQuery } from '../../useSearchQuery';
import { Wrapper, Content } from '../styles';
import { HomePageDataProvider } from './HomePageDataContext';
import { NavBar } from '../../NavBar';
import { Vizzes } from './Vizzes';
import { Banner } from './Banner';
import { Sort } from './Sort';

const isDefault = (sort) => VIZ_INFO_DEFAULT_SORT_OPTION.id === sort;

export const HomePage = ({ history }) => {
  const sort = useSearchQuery('sort');

  const handleSortChange = useCallback(
    (newSort) => {
      history.push({ search: isDefault(newSort) ? '' : `?sort=${newSort}` });
    },
    [history]
  );

  return (
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
  );
};
