import { useCallback } from 'react';
import { usePaginatedVizzes } from '../../../VizzesGrid/usePaginatedVizzes';
import { fetchProfilePageData } from './fetchProfilePageData';

export const useProfilePageData = (userName, query, sort) => {
  const fetchData = useCallback(
    (offset) => {
      return fetchProfilePageData({ userName, query, sort, offset }).then(
        ({ user, visualizationInfos, error }) => {
          if (error && error.message === 'The requested user does not exist') {
            return {
              error: { message: 'User not found' },
            };
          }

          return {
            ownerUsers: [user],
            visualizationInfos,
          };
        }
      );
    },
    [sort, userName, query]
  );

  const paginatedVizzes = usePaginatedVizzes(fetchData);
  const user =
    paginatedVizzes.error || !paginatedVizzes.usersById
      ? null
      : Object.values(paginatedVizzes.usersById)[0];

  return {
    ...paginatedVizzes,
    user,
  };
};
