import { createVizzFetcherHook } from './createVizzFetcherHook';

const fetchVizzes = async ({ offset, userId }) => {
  const response = await fetch('/api/visualization/get/shared', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offset, userId }),
  });
  return await response.json();
};

export const useSharedWithMeVizFetcher = createVizzFetcherHook({
  vizTypeOfInterest: 'shared',
  fetchVizzes,
});
