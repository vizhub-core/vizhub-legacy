import React, { useCallback } from 'react';
import { sendEvent } from '../../../../../sendEvent';
import { Voter } from '../../../../../Voter';
import { Wrapper, Title } from './styles';

export const TitleBar = ({
  title,
  vizId,
  canVote,
  didVote,
  upvoteCount,
  onUpvoteClick,
  isPrivate,
  usersWhoUpvoted,
}) => {
  const instrumentedOnUpvoteClick = useCallback(() => {
    onUpvoteClick();
    const action = (didVote ? 'undo-' : '') + 'upvote';
    const source = 'viz-page';
    sendEvent(`interaction.viz.${action}.viz:${vizId}.from-${source}`);
  }, [onUpvoteClick, vizId, didVote]);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Voter
        upvoteCount={upvoteCount}
        onUpvoteClick={instrumentedOnUpvoteClick}
        canVote={canVote}
        didVote={didVote}
        isPrivate={isPrivate}
        usersWhoUpvoted={usersWhoUpvoted}
      />
    </Wrapper>
  );
};
