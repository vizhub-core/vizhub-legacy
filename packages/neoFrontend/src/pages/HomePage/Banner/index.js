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
  MessageButton
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
                href="https://datavis.tech/coronavirus-dataviz-hackathon/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Coronavirus Dataviz Hackathon March 21
              </MessageLink>
            </li>
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
                href="https://discourse.vizhub.com/t/welcome-to-the-vizhub-user-forum/7"
                target="_blank"
                rel="noopener noreferrer"
              >
                VizHub Discourse User Forum
              </MessageLink>
            </li>
          </MessageList>
        </MessageSmallText>
      </Message>
    </Right>
  </Wrapper>
);
