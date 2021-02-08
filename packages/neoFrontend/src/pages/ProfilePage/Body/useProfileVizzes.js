import { useMemo } from 'react';
import { usePaginatedVizzes } from '../../../VizzesGrid/usePaginatedVizzes';
import { usePublicVizFetcher } from './usePublicVizFetcher';
import { usePrivateVizFetcher } from './usePrivateVizFetcher';
import { useSharedWithMeVizFetcher } from './useSharedWithMeVizFetcher';

export const useProfileVizzes = ({
  user,
  section,
  initialVisualizationInfos,
}) => {
  const publicInitialState = useMemo(() => {
    return {
      visualizationInfos: initialVisualizationInfos,
      isFetchingNextPage: false,
      currentPage: 1,
      fetchedAllPages: false,
      usersById: user ? { [user.id]: user } : {},
      error: null,
    };
  }, [user, initialVisualizationInfos]);

  const userId = user ? user.id : null;
  const currentSection = section || 'public'; // coerce "" (empty string) to public

  const publicVizFetcher = usePublicVizFetcher(userId, currentSection);
  const publicData = usePaginatedVizzes(publicVizFetcher, publicInitialState);

  const privateVizFetcher = usePrivateVizFetcher(userId, currentSection);
  const privateData = usePaginatedVizzes(privateVizFetcher);

  const sharedWithMeVizFetcher = useSharedWithMeVizFetcher(
    userId,
    currentSection
  );
  const sharedData = usePaginatedVizzes(sharedWithMeVizFetcher);

  if (currentSection === 'shared') {
    return sharedData;
  } else if (currentSection === 'private') {
    return privateData;
  } else {
    return publicData;
  }
};
