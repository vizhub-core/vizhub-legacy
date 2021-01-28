import { useCallback, useEffect, useState } from 'react';

export const createVizzFetcherHook = ({ vizTypeOfInterest, fetchVizzes }) => (
  userId,
  vizType
) => {
  const [
    isVizzesOfTypeRequestedAtLeastOnce,
    setIsVizzesOfTypeRequestedAtLeastOnce,
  ] = useState(false);

  useEffect(() => {
    if (vizType === vizTypeOfInterest)
      setIsVizzesOfTypeRequestedAtLeastOnce(true);
  }, [vizType]);

  const fetch = useCallback((offset) => fetchVizzes({ offset, userId }), [
    userId,
  ]);

  return isVizzesOfTypeRequestedAtLeastOnce && userId ? fetch : null;
};
