import React from 'react';
import { useValue } from '../useValue';
import { VizPreview } from './VizPreview';

const getOwner = info => info.owner;

export const LiveVizPreview = ({ vizInfo$, getUser }) => {
  const vizInfo = useValue(vizInfo$);
  const owner = useValue(vizInfo$, getOwner);

  return (
    <VizPreview
      vizInfo={vizInfo}
      ownerUser={getUser(owner)}
    />
  );
};
