import { useEffect, useCallback } from 'react';
import { useSearchQuery } from '../../useSearchQuery';
import { usePageData as useVizzesGridPageData } from '../../VizzesGrid/usePageData';
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
  } = useVizzesGridPageData(fetchData);

  // reset page data if query was changed
  useEffect(() => reset(), [query, reset]);

  return {
    visualizationInfos,
    paginate,
    usersById,
    isFetchingNextPage,
  };
};
