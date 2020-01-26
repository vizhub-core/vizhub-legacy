import React, { createContext } from 'react';
import { useSearchQuery } from '../../useSearchQuery';
import { useSearchResultsPageData } from './useSearchResultsPageData';

export const SearchResultsPageDataContext = createContext();

export const SearchResultsPageDataProvider = ({ fallback, children }) => {
  const query = useSearchQuery('query');
  const searchResultsPageData = useSearchResultsPageData(query);

  return searchResultsPageData ? (
    <SearchResultsPageDataContext.Provider value={searchResultsPageData}>
      {children}
    </SearchResultsPageDataContext.Provider>
  ) : (
    fallback
  );
};
