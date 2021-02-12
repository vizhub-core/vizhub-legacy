import { useEffect, useRef, useState } from 'react';
import { usePaginatedVizzes } from '../../../VizzesGrid/usePaginatedVizzes';
import { usePublicVizFetcher } from './usePublicVizFetcher';
import { usePrivateVizFetcher } from './usePrivateVizFetcher';
import { useSharedVizFetcher } from './useSharedVizFetcher';

const getInitialState = (user, initialVisualizationInfos) => ({
  visualizationInfos: initialVisualizationInfos,
  isFetchingNextPage: false,
  currentPage: 1,
  fetchedAllPages: false,
  usersById: user ? { [user.id]: user } : {},
  error: null,
});
export const useProfileVizzes = ({
  user,
  section,
  sort,
  initialVisualizationInfos,
}) => {
  const userId = user ? user.id : null;
  const currentSection = section || 'public'; // coerce "" (empty string) to public

  const [initialPublicState, setInitialPublicState] = useState(() =>
    currentSection === 'public'
      ? getInitialState(user, initialVisualizationInfos)
      : null
  );
  const [initialPrivateState, setInitialPrivateState] = useState(() =>
    currentSection === 'private'
      ? getInitialState(user, initialVisualizationInfos)
      : null
  );
  const [initialSharedState, setInitialSharedState] = useState(() =>
    currentSection === 'shared'
      ? getInitialState(user, initialVisualizationInfos)
      : null
  );

  const publicVizFetcher = usePublicVizFetcher(userId, currentSection, sort);
  const publicData = usePaginatedVizzes(publicVizFetcher, initialPublicState);

  const privateVizFetcher = usePrivateVizFetcher(userId, currentSection, sort);
  const privateData = usePaginatedVizzes(
    privateVizFetcher,
    initialPrivateState
  );

  const sharedVizFetcher = useSharedVizFetcher(userId, currentSection, sort);
  const sharedData = usePaginatedVizzes(sharedVizFetcher, initialSharedState);

  const isInitialSortAppliedRef = useRef(false)
  useEffect(() => {
    if (!isInitialSortAppliedRef.current) {
      isInitialSortAppliedRef.current = true
      return;
    }

    setInitialPublicState(null);
    setInitialPrivateState(null);
    setInitialSharedState(null);
  }, [isInitialSortAppliedRef, sort]);


  if (currentSection === 'shared') {
    return sharedData;
  } else if (currentSection === 'private') {
    return privateData;
  } else {
    return publicData;
  }
};
