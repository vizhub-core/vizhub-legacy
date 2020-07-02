import React, { useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../../authentication';
import { VizPreviews, LiveVizPreview } from '../../VizPreview';
import { LoadingScreen } from '../../LoadingScreen';
import { Wrapper } from './styles';

// Trigger infinite scroll when the user gets 100px away from the bottom.
const distanceFromBottomTrigger = 100;

export const Vizzes = ({
  visualizationInfos,
  paginate,
  usersById,
  isFetchingNextPage,
  className,
}) => {
  useEffect(() => {
    if (!paginate) return;

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

  const getUser = useCallback((id) => usersById[id], [usersById]);

  const { me } = useContext(AuthContext);

  return (
    <Wrapper>
      {visualizationInfos.length !== 0 ? (
        <VizPreviews className={className}>
          {visualizationInfos.map((vizInfo) => (
            <LiveVizPreview
              key={vizInfo.id}
              me={me}
              vizInfo={vizInfo}
              getUser={getUser}
            />
          ))}
        </VizPreviews>
      ) : null}
      {isFetchingNextPage ? <LoadingScreen isChild={true} /> : null}
    </Wrapper>
  );
};
