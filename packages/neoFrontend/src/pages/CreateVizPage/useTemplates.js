import { useCallback } from 'react';
import { usePaginatedVizzes } from '../../VizzesGrid/usePaginatedVizzes';

const urlBase = process.env.NODE_ENV === 'development' ? 'https://staging.vizhub.com':'';
const url = `${urlBase}/api/visualization/get/info`;

export const useTemplates = (ids) => {
  const fetchData = useCallback(
    async (offset) => {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offset, ids }),
      });
      return await response.json();
    },
    [ids]
  );

  return usePaginatedVizzes(fetchData);
};
