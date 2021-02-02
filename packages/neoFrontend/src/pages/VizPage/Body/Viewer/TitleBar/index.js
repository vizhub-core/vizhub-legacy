import React, { useCallback } from 'react';
import { sendEvent, upvoteEvent } from '../../../../../sendEvent';
import { Voter } from '../../../../../Voter';
import { PrivacyNotice } from '../../../../../PrivacyNotice';
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
  owner,
}) => {
  const instrumentedOnUpvoteClick = useCallback(() => {
    onUpvoteClick();
    sendEvent(upvoteEvent(vizId, didVote, 'viz-page'));
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
        extension={isPrivate && <PrivacyNotice owner={owner} />}
      />
    </Wrapper>
  );
};
