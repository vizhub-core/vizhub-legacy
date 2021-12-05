import React from 'react';
import { format } from 'd3-format';
import { UpvoteSVG, DownvoteSVG } from '../../../svg';
import { Action } from './Action';

export const formatVotes = format(',');

export const Upvote = ({ upvotes }) => (
  <Action svg={UpvoteSVG}>{formatVotes(upvotes)}</Action>
);

export const Downvote = ({ downvotes }) => (
  <Action svg={DownvoteSVG}>{formatVotes(downvotes)}</Action>
);
