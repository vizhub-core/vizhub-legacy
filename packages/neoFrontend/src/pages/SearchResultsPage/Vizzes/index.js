import React, { useContext, useEffect, useCallback } from 'react';
import { VizPreviews, VizPreview } from '../../../VizPreview';
import { LoadingScreen } from '../../../LoadingScreen';
import { SearchResultsPageDataContext } from '../SearchResultsPageDataContext';
import { Wrapper } from './styles';

// Trigger infinite scroll when the user gets 100px away from the bottom.
const distanceFromBottomTrigger = 100;

export const Vizzes = () => {
  const {
    searchResultsPageVisualizationInfos,
    paginate,
    usersById,
    isFetchingNextPage
  } = useContext(SearchResultsPageDataContext);

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
      {searchResultsPageVisualizationInfos.length !== 0 ? (
        <VizPreviews className="test-searchResults-page-viz-previews">
          {searchResultsPageVisualizationInfos.map(vizInfo => (
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
