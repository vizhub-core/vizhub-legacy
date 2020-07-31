import React from 'react';
import { Wrapper, FeedbackButton } from './styles';

export const Feedback = () => (
  <Wrapper>
    <a
      href="https://github.com/datavis-tech/vizhub-issue-tracker/issues/new"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FeedbackButton>Feedback</FeedbackButton>
    </a>
  </Wrapper>
);
