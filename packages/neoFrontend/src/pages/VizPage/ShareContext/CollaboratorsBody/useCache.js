import { useCallback, useReducer } from 'react';

const IS_FETCHING = 'IS_FETCHING';

// Inspired by:
//  * https://reactjs.org/docs/hooks-reference.html#usereducer
//  * https://redux.js.org/advanced/async-actions
const reducer = (cache, action) => {
  switch (action.type) {
    case 'REQUEST':
      return { ...cache, [action.cacheKey]: IS_FETCHING };
    case 'RECEIVE':
      return { ...cache, [action.cacheKey]: action.response };
    default:
      throw new Error();
  }
};

// Exposes a single function: requestData,
// which will fetch if needed, then cache.
export const useCache = () => {
  // cache[cacheKey] represents an entry for a potential fetch.
  // Initially, it is not defined, meaning the data has not been fetched.
  // When it is in the process of being fetched, the value is IS_FETCHING.
  // After the data is loaded, the value is the parsed JSON response.
  const [cache, dispatch] = useReducer(reducer, {});

  // This function requests data for a specific region ID.
  //
  // Accepts a cacheKey string and a "goFetch" function.
  // The "goFetch" function is only invoked in the case of a cache miss.
  // The "goFetch" function is expected to return a Promise
  // that resolves to the data to cache.
  //
  //  * Returns null if the data is loading.
  //  * Returns the cached data if data has loaded.
  const requestData = useCallback(
    ({ cacheKey, goFetch }) => {
      const cached = cache[cacheKey];

      // If this request is already pending, do nothing.
      if (cached === IS_FETCHING) {
        //console.log('cache pending on ' + cacheKey);
        return null;
      }

      // Return the cached value if available.
      if (cached) {
        //console.log('cache hit on ' + cacheKey);
        return cached;
      }

      // At this point, we need to initiate a fetch for the data.

      // First, mark this request as being en route.
      dispatch({ type: 'REQUEST', cacheKey });

      // Then, kick off an async fetch.
      //console.log('cache miss on ' + cacheKey);
      goFetch().then((response) => {
        // When the result comes back, it will be stashed in the cache.
        dispatch({ type: 'RECEIVE', cacheKey, response });
      });
    },
    [cache, dispatch]
  );

  return { requestData };
};
