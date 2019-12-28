import React, { useContext, useEffect, useCallback } from 'react';
import { VizPreviews, VizPreview } from '../../../VizPreview';
//import { AuthContext } from '../../../authentication';
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

  // TODO we'll need to bring this back when we implement
  // display of upvote counts on home page, to show the
  // ones the logged in user voted on as black.
  // https://discourse.vizhub.com/t/feature-request-show-upvote-count-in-viz-previews/105
  //const { me } = useContext(AuthContext);

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

  const getUser = useCallback(id => usersById[id], [usersById]);

  return (
    <Wrapper>
      {homePageVisualizationInfos.length !== 0 ? (
        <VizPreviews className="test-home-page-viz-previews">
          {homePageVisualizationInfos.map(vizInfo => (
            <VizPreview
              key={vizInfo.id}
              vizInfo={vizInfo}
              ownerUser={getUser(vizInfo.owner)}
            />
          ))}
        </VizPreviews>
      ) : null}
      {isFetchingNextPage ? <LoadingScreen isChild={true} /> : null}
    </Wrapper>
  );
};
