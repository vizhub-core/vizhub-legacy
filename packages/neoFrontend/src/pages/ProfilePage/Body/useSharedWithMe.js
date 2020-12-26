import { useCallback } from 'react';
import { usePaginatedVizzes } from '../../../VizzesGrid/usePaginatedVizzes';

export const useSharedWithMe = (userId) => {
  const fetchData = useCallback(
    async (offset) => {
      if (!userId) return;

      const response = await fetch('/api/visualization/get/shared', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offset, collaborators: [userId] }),
      });
      return await response.json();
    },
    [userId]
  );

  return usePaginatedVizzes(userId ? fetchData : null);
};
