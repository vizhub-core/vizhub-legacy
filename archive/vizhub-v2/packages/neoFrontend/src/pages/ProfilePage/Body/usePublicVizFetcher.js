import { createVizzFetcherHook } from './createVizzFetcherHook';

const fetchVizzes = async ({ offset, sort, userId }) => {
  const response = await fetch('/api/visualization/get/public', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offset, sort, owner: userId }),
  });
  return await response.json();
};

export const usePublicVizFetcher = createVizzFetcherHook({
  vizTypeOfInterest: 'public',
  fetchVizzes,
});
