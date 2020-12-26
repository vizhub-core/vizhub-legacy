import { useMemo, useContext } from 'react';
import { isVizInfoPrivate } from 'vizhub-presenters';
import { ProfilePageDataContext } from '../ProfilePageDataContext';
import { useSharedWithMe } from './useSharedWithMe';

export const useProfileData = (me, typeOfVizzes) => {
  const profilePageData = useContext(ProfilePageDataContext);
  const sharedData = useSharedWithMe(typeOfVizzes === 'shared' ? me.id : null);

  return useMemo(() => {
    if (typeOfVizzes === 'shared') {
      return {
        user: profilePageData.user,
        visualizationInfos: sharedData.visualizationInfos,
        paginate: sharedData.paginate,
        usersById: sharedData.usersById,
        isFetchingNextPage: sharedData.isFetchingNextPage,
      };
    } else {
      const visualizationInfos = profilePageData.visualizationInfos.filter(
        (d) =>
          typeOfVizzes === 'private'
            ? isVizInfoPrivate(d)
            : !isVizInfoPrivate(d)
      );

      return {
        ...profilePageData,
        visualizationInfos,
      };
    }
  }, [typeOfVizzes, profilePageData, sharedData]);
};
