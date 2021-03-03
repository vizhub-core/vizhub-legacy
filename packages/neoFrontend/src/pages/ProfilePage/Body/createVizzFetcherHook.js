import { useCallback, useEffect, useState } from 'react';

export const createVizzFetcherHook = ({ vizTypeOfInterest, fetchVizzes }) => (
  userId,
  vizType,
  sort
) => {
  const [
    isVizzesOfTypeRequestedAtLeastOnce,
    setIsVizzesOfTypeRequestedAtLeastOnce,
  ] = useState(false);

  useEffect(() => {
    if (vizType === vizTypeOfInterest)
      setIsVizzesOfTypeRequestedAtLeastOnce(true);
  }, [vizType]);

  const fetch = useCallback((offset) => fetchVizzes({ offset, sort, userId }), [
    userId,
    sort,
  ]);

  return isVizzesOfTypeRequestedAtLeastOnce && userId ? fetch : null;
};
