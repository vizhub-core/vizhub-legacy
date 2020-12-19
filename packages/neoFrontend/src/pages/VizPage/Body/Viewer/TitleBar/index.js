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
    sendEvent(`interaction.viz.upvote.viz:${vizId}.from-viz-page`);
  }, [onUpvoteClick, vizId]);

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
