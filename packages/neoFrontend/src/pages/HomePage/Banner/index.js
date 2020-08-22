import React from 'react';
import { Link } from 'react-router-dom';
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

const iFrameScale = 0.75;

export const Banner = () => (
  <Wrapper>
    <Bar></Bar>
    <Left>
      <Message>
        <MessageLargeText>Data Visualization</MessageLargeText>
        <MessageSmallText>is easier than you think.</MessageSmallText>
        <Link to="/create-viz">
          <MessageButton>Create a Viz</MessageButton>
        </Link>
      </Message>
    </Left>
    <iframe
      src="https://vizhub.com/curran/77a2f42571494263931b8c4d38b7d63c?mode=embed"
      title="Mountains on a Map"
      width={960 * iFrameScale}
      height={500 * iFrameScale}
      style={{
        border: 0,
        backgroundColor: '#FFFFFF',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 3px 0px',
      }}
    ></iframe>
    <Right>
      <Message>
        <MessageLargeText>Learn</MessageLargeText>
        <MessageSmallText>
          <MessageList>
            <li>
              <MessageLink
                href="https://curran.github.io/dataviz-course-2018/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datavis 2018 (D3 Only)
              </MessageLink>
            </li>
            <li>
              <MessageLink
                href="https://datavis.tech/datavis-2020/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datavis 2020 (React & D3)
              </MessageLink>
            </li>
          </MessageList>
        </MessageSmallText>
      </Message>
    </Right>
  </Wrapper>
);
