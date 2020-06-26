import React, { useCallback } from 'react';
import { useValue } from '../useValue';
import { VizPreview } from './VizPreview';

export const LiveVizPreview = ({ vizInfo$, getUser }) => {
  const getOwner = useCallback(info => info.owner, []);

  const vizInfo = useValue(vizInfo$);
  const owner = useValue(vizInfo$, getOwner);

  return (
    <VizPreview
      vizInfo={vizInfo}
      ownerUser={getUser(owner)}
    />
  );
};
