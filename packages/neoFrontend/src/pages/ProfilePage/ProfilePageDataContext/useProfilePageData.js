import { useCallback } from 'react';
import { usePaginatedVizzes } from '../../../VizzesGrid/usePaginatedVizzes';
import { fetchProfilePageData } from './fetchProfilePageData';

export const useProfilePageData = (userName, query, sort) => {
  const fetchData = useCallback(
    (offset) => {
      return fetchProfilePageData({ userName, query, sort, offset }).then(({ user, visualizationInfos }) => ({
        ownerUsers: [user],
        visualizationInfos,
      }));
    },
    [sort, userName, query]
  );

  const paginatedVizzes = usePaginatedVizzes(fetchData);

  return {
    ...paginatedVizzes,
    user: Object.values(paginatedVizzes.usersById)[0],
  };
};
