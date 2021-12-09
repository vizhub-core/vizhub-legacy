import { useCallback } from 'react';
import { usePaginatedVizzes } from '../../VizzesGrid/usePaginatedVizzes';
import { fetchHomePageData } from './fetchHomePageData';

export const useHomePageData = ({ sort }) => {
  const fetchData = useCallback(
    (offset) => {
      return fetchHomePageData({ offset, sort });
    },
    [sort]
  );

  return usePaginatedVizzes(fetchData);
};
