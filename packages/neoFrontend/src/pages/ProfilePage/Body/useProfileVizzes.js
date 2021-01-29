import { useMemo } from 'react';
import { usePaginatedVizzes } from '../../../VizzesGrid/usePaginatedVizzes';
import { usePublicVizFetcher } from './usePublicVizFetcher';
import { usePrivateVizFetcher } from './usePrivateVizFetcher';
import { useSharedWithMeVizFetcher } from './useSharedWithMeVizFetcher';

export const useProfileVizzes = ({
  me,
  section,
  initialVisualizationInfos,
}) => {
  const publicInitialState = useMemo(() => {
    return {
      visualizationInfos: initialVisualizationInfos,
      isFetchingNextPage: false,
      currentPage: 1,
      fetchedAllPages: false,
      usersById: me ? { [me.id]: me } : {},
      error: null,
    };
  }, [me, initialVisualizationInfos]);

  const myUserId = me ? me.id : null;
  const currentSection = section || "public" // handles coerce "" to public

  const publicVizFetcher = usePublicVizFetcher(myUserId, currentSection);
  const publicData = usePaginatedVizzes(publicVizFetcher, publicInitialState);

  const privateVizFetcher = usePrivateVizFetcher(myUserId, currentSection);
  const privateData = usePaginatedVizzes(privateVizFetcher);

  const sharedWithMeVizFetcher = useSharedWithMeVizFetcher(myUserId, currentSection);
  const sharedData = usePaginatedVizzes(sharedWithMeVizFetcher);

  if (currentSection === 'shared') {
    return sharedData;
  } else if (currentSection === 'private') {
    return privateData;
  } else {
    return publicData;
  }
};
