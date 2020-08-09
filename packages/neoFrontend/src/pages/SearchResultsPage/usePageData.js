import { useEffect, useCallback } from 'react';
import { useSearchQuery } from '../../useSearchQuery';
import { usePaginatedVizzes } from '../../VizzesGrid/usePaginatedVizzes';
import { fetchPageData } from './fetchPageData';

export const usePageData = () => {
  const query = useSearchQuery('query');

  const fetchData = useCallback((offset) => fetchPageData(query, offset), [
    query,
  ]);

  const {
    visualizationInfos,
    paginate,
    usersById,
    isFetchingNextPage,
    reset,
  } = usePaginatedVizzes(fetchData);

  // reset page data if query was changed
  useEffect(() => reset(), [query, reset]);

  return {
    visualizationInfos,
    paginate,
    usersById,
    isFetchingNextPage,
  };
};
