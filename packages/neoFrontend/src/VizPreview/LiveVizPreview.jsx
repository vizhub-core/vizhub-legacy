import React, { useCallback } from 'react';
import {
  getVizInfoOwner,
  getVizInfoUpvotes,
  getDidVote
} from 'vizhub-presenters';
import { useValue } from '../useValue';
import { VizPreview } from './VizPreview';

export const LiveVizPreview = ({
  me,
  vizInfo$,
  getUser,
  onUpvoteClick
}) => {
  const owner = useValue(vizInfo$, getVizInfoOwner);

  const vizInfo = useValue(vizInfo$);
  const upvotes = useValue(vizInfo$, getVizInfoUpvotes);
  const didVote = getDidVote(upvotes, me);

  const handleUpvote = useCallback(() => {
    onUpvoteClick(vizInfo);
  }, [vizInfo, onUpvoteClick]);

  return (
    <VizPreview
      canVote={!!me && !!onUpvoteClick}
      didVote={didVote}
      vizInfo={vizInfo}
      ownerUser={getUser(owner)}
      onUpvoteClick={handleUpvote}
    />
  );
};
