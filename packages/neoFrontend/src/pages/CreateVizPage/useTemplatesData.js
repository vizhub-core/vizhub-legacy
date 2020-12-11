import { useCallback } from 'react';
import { usePaginatedVizzes } from '../../VizzesGrid/usePaginatedVizzes';

export const useTemplatesData = () => {
  const fetchData = useCallback(
    async (offset) => {
      const url = `/api/visualization/templates?offset=${offset}`;
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
      });
      return await response.json();
    },
    []
  );

  return usePaginatedVizzes(fetchData);
};
