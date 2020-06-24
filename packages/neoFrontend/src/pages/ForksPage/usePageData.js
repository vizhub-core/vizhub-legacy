import { useCallback } from 'react';
import { useParams } from 'react-router';
import { usePageData as useVizzesGridPageData } from '../../VizzesGrid/usePageData';
import { fetchPageData } from './fetchPageData';

export const usePageData = () => {
  let { vizId } = useParams();

  const fetchData = useCallback((offset) => fetchPageData(vizId, offset), [
    vizId,
  ]);

  return useVizzesGridPageData(fetchData);
};
