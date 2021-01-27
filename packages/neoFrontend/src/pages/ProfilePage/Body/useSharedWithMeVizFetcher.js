import { useCallback, useEffect, useState } from 'react';

export const useSharedWithMeVizFetcher = (userId, vizType) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (vizType === 'shared') setState(true);
  }, [vizType]);

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

  return state ? fetchData : null;
};
