import { useCallback } from 'react';
import { usePageData } from '../../VizzesGrid/usePageData';
import { fetchHomePageData } from './fetchHomePageData';

export const useHomePageData = ({ sort }) => {
  const fetchData = useCallback((offset) => {
    return fetchHomePageData({ offset, sort });
  }, [sort]);

  return usePageData(fetchData);
};
