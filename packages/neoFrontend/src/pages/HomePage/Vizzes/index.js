import React, { useContext, useEffect, useCallback } from 'react';
import { VizPreviews, VizPreview } from '../../../VizPreview/styles';
import { LoadingScreen } from '../../../LoadingScreen';
import { HomePageDataContext } from '../HomePageDataContext';
import { Wrapper } from './styles';

// Trigger infinite scroll when the user gets 100px away from the bottom.
const distanceFromBottomTrigger = 100;

export const Vizzes = () => {
  const {
    homePageVisualizationInfos,
    paginate,
    usersById,
    isFetchingNextPage
  } = useContext(HomePageDataContext);

  useEffect(() => {
    const onScroll = () => {
      const distanceFromBottom =
        document.body.offsetHeight - (window.innerHeight + window.scrollY);
      if (distanceFromBottom < distanceFromBottomTrigger) {
        paginate.current();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [paginate]);

  const getUserName = useCallback(
    id => {
      const user = usersById[id];
      return user && user.userName;
    },
    [usersById]
  );

  return (
    <Wrapper>
      <VizPreviews>
        {homePageVisualizationInfos.map(({ id, title, owner }) => (
          <VizPreview
            key={id}
            to={`/${getUserName(owner)}/${id}?edit=files`}
            title={title}
            style={{
              backgroundImage: `url(/api/visualization/thumbnail/${id}.png)`
            }}
          />
        ))}
      </VizPreviews>
      {isFetchingNextPage ? <LoadingScreen isChild={true} /> : null}
    </Wrapper>
  );
};
