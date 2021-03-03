import { createVizzFetcherHook } from './createVizzFetcherHook';

const fetchVizzes = async ({ offset, sort, userId }) => {
  const response = await fetch('/api/visualization/get/shared', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offset, sort, userId }),
  });
  return await response.json();
};

export const useSharedVizFetcher = createVizzFetcherHook({
  vizTypeOfInterest: 'shared',
  fetchVizzes,
});
