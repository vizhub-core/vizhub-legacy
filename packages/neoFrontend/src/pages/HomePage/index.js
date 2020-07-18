import React, { useState, useCallback } from 'react';
import { showSortOptions } from '../../featureFlags';
import { LoadingScreen } from '../../LoadingScreen';
import { useSearchQuery } from '../../useSearchQuery';
import { Wrapper, Content } from '../styles';
import { HomePageDataProvider } from './HomePageDataContext';
import { NavBar } from '../../NavBar';
import { Vizzes } from './Vizzes';
import { Banner } from './Banner';
import { Sort, ENABLED_SORT_OPTIONS } from './Sort';

export const HomePage = ({ history }) => {
  const requestedSort = useSearchQuery('sort');

  const initialSort = ENABLED_SORT_OPTIONS[requestedSort] || ENABLED_SORT_OPTIONS.defaultOption;

  const [sort, setSort] = useState(initialSort);

  const handleSortChange = useCallback((updatedSort) => {
    // defaultOption is intentionally omitted
    // eslint-disable-next-line no-unused-vars
    const { defaultOption, ...availableSortOptions } = ENABLED_SORT_OPTIONS;
    const sortName = Object.keys(availableSortOptions).find(key => ENABLED_SORT_OPTIONS[key] === updatedSort);
    const sortParam = new URLSearchParams({sort: sortName}).toString();

    history.push({
      search: `?${sortParam}` 
    });
    setSort(updatedSort);
  }, [
    history,
    setSort
  ]);

  return (
    <HomePageDataProvider sort={sort} fallback={<LoadingScreen />}>
      <NavBar isHomePage={true} showSearch />
      <Wrapper>
        <Content>
          <Banner />
          {showSortOptions ? <Sort value={sort} onChange={handleSortChange} /> : null}
          <Vizzes />
        </Content>
      </Wrapper>
    </HomePageDataProvider>
  );
};
