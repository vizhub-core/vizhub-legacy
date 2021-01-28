import { useMemo } from 'react';
import { usePaginatedVizzes } from '../../../VizzesGrid/usePaginatedVizzes';
import { usePublicVizFetcher } from './usePublicVizFetcher';
import { usePrivateVizFetcher } from './usePrivateVizFetcher';
import { useSharedWithMeVizFetcher } from './useSharedWithMeVizFetcher';

export const useProfileVizzes = ({
  me,
  vizType,
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

  const publicVizFetcher = usePublicVizFetcher(myUserId, vizType);
  const publicData = usePaginatedVizzes(publicVizFetcher, publicInitialState);

  const privateVizFetcher = usePrivateVizFetcher(myUserId, vizType);
  const privateData = usePaginatedVizzes(privateVizFetcher);

  const sharedWithMeVizFetcher = useSharedWithMeVizFetcher(myUserId, vizType);
  const sharedData = usePaginatedVizzes(sharedWithMeVizFetcher);

  if (vizType === 'shared') {
    return sharedData;
  } else if (vizType === 'private') {
    return privateData;
  } else {
    return publicData;
  }
};
