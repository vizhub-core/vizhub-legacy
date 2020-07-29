import React, { useCallback } from 'react';
import {
  getDidVote,
  getVizInfoOwner,
  getVizInfoUpvotes,
  upvoteOp,
} from 'vizhub-presenters';
import { useValue } from '../useValue';
import { useVizInfo } from '../vizRealTimeHooks';
import { VizPreview } from './VizPreview';

export const LiveVizPreview = ({ me, vizInfo, getUser }) => {
  const { vizInfo$, submitVizInfoOp } = useVizInfo(vizInfo);

  const owner = useValue(vizInfo$, getVizInfoOwner);
  const freshVizInfo = useValue(vizInfo$);
  const upvotes = useValue(vizInfo$, getVizInfoUpvotes);

  const didVote = getDidVote(upvotes, me);

  const handleUpvote = useCallback(() => {
    if (me) {
      submitVizInfoOp(upvoteOp(me.id, upvotes));
    }
  }, [submitVizInfoOp, me, upvotes]);

  return (
    <VizPreview
      canVote={!!me}
      didVote={didVote}
      vizInfo={freshVizInfo}
      ownerUser={getUser(owner)}
      onUpvoteClick={handleUpvote}
    />
  );
};
