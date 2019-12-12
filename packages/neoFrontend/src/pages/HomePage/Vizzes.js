import React, { useContext, useEffect } from 'react';
import { HomePageDataContext } from './HomePageDataContext';
import { VizPreviews, VizPreview } from '../../VizPreview/styles';

// Trigger infinite scroll when the user gets 100px away from the bottom.
const distanceFromBottomTrigger = 100;

export const Vizzes = () => {
  const { homePageVisualizationInfos, paginate } = useContext(
    HomePageDataContext
  );

  // TODO use correct usernames
  const userName = 'undefined';

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

  return (
    <VizPreviews>
      {homePageVisualizationInfos.map(({ id, title }) => (
        <VizPreview
          key={id}
          to={`/${userName}/${id}?edit=files`}
          title={title}
          style={{
            backgroundImage: `url(/api/visualization/thumbnail/${id}.png)`
          }}
        />
      ))}
    </VizPreviews>
  );
};
