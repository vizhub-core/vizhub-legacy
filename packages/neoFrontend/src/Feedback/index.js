import React from 'react';
import { Wrapper, FeedbackButton } from './styles';

export const Feedback = () => (
  <a
    href="https://github.com/datavis-tech/vizhub-issue-tracker/issues/new"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Wrapper>
      <FeedbackButton>Feedback</FeedbackButton>
    </Wrapper>
  </a>
);
