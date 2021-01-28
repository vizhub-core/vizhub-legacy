import { createVizzFetcherHook } from './createVizzFetcherHook';

const fetchVizzes = async ({ offset, userId }) => {
  const response = await fetch('/api/visualization/get/private', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offset, owner: userId }),
  });
  return await response.json();
};

export const usePrivateVizFetcher = createVizzFetcherHook({
  vizTypeOfInterest: 'private',
  fetchVizzes,
});
