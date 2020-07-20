import React from 'react';
import {
  Wrapper,
  Bar,
  Left,
  Right,
  Message,
  MessageSmallText,
  MessageLargeText,
  MessageList,
  MessageLink,
  MessageButton,
} from './styles';

export const Banner = () => (
  <Wrapper>
    <Bar></Bar>
    <Left>
      <Message>
        <MessageSmallText>Teach, learn, & practice</MessageSmallText>
        <MessageLargeText>Data Visualization</MessageLargeText>
        <MessageSmallText>using Web technologies.</MessageSmallText>
        <a
          href="https://datavis.tech/vizhub/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageButton>Learn more</MessageButton>
        </a>
      </Message>
    </Left>
    <Right>
      <Message>
        <MessageLargeText>Join Our Community</MessageLargeText>
        <MessageSmallText>
          <MessageList>
            <li>
              <MessageLink
                href="https://datavis.tech/datavis-2020/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datavis 2020 Free Online Course
              </MessageLink>
            </li>
            <li>
              <MessageLink
                href="https://curran.github.io/dataviz-course-2018/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Data Visualization Course 2018
              </MessageLink>
            </li>
            <li>
              <MessageLink
                href="https://github.com/datavis-tech/vizhub-issue-tracker/issues/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                Send feedback
              </MessageLink>
            </li>
          </MessageList>
        </MessageSmallText>
      </Message>
    </Right>
  </Wrapper>
);
