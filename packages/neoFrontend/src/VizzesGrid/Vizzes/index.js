import React, { useEffect, useCallback, useMemo } from 'react';
import { VizPreviews, LiveVizPreview } from '../../VizPreview';
import { LoadingScreen } from '../../LoadingScreen';
import { useVizInfos } from '../../vizRealTimeHooks';
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

  const { vizInfos$ } = useVizInfos(visualizationInfos);

  const liveVizInfoEntries = useMemo(() => Object.entries(vizInfos$), [
    vizInfos$,
  ]);

  return (
    <Wrapper>
      {liveVizInfoEntries.length !== 0 ? (
        <VizPreviews className={className}>
          {liveVizInfoEntries.map(([id, vizInfo$]) => (
            <LiveVizPreview key={id} vizInfo$={vizInfo$} getUser={getUser} />
          ))}
        </VizPreviews>
      ) : null}
      {isFetchingNextPage ? <LoadingScreen isChild={true} /> : null}
    </Wrapper>
  );
};
