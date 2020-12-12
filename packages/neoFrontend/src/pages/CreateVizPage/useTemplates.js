import { useCallback } from 'react';
import { usePaginatedVizzes } from '../../VizzesGrid/usePaginatedVizzes';

export const useTemplates = (ids) => {
  const fetchData = useCallback(async (offset) => {
    const url = `/api/visualization/get/info`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offset, ids }),
    });
    return await response.json();
  }, [ids]);

  return usePaginatedVizzes(fetchData);
};
