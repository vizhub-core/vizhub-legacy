import { useCallback } from 'react';
import { usePaginatedVizzes } from '../../VizzesGrid/usePaginatedVizzes';

export const useTemplates = (ids) => {
  const fetchData = useCallback(async (offset) => {
    const url = `/api/visualization/get?offset=${offset}&ids=${ids}`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    });
    return await response.json();
  }, []);

  return usePaginatedVizzes(fetchData);
};
