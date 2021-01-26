import { useCallback , useEffect, useState} from 'react';

export const usePrivateVizFetcher = (userId, vizType) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    if(vizType === 'private') setState(true)
  }, [vizType])

  const fetchData = useCallback(
    async (offset) => {
      if (!userId) return;

      const response = await fetch('/api/visualization/get/private', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offset, owner: userId }),
      });
      return await response.json();
    },
    [userId]
  );

  return state ? fetchData : null;
};
