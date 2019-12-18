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
  MessageLink
} from './styles';
export const Banner = () => (
  <Wrapper>
    <Bar></Bar>
    <Left>
      <Message>
        <MessageSmallText>Teach, learn, & practice</MessageSmallText>
        <MessageLargeText>Data Visualization</MessageLargeText>
        <MessageSmallText>using Web technologies.</MessageSmallText>
      </Message>
    </Left>
    <Right>
      <Message>
        <MessageLargeText>Join Our Community</MessageLargeText>
        <MessageSmallText>
          <MessageList>
            <li>
              <MessageLink href="https://www.kickstarter.com/projects/curran/vizhub-launch">
                VizHub Launch Kickstarter
              </MessageLink>
            </li>
            <li>
              <MessageLink href="https://discourse.vizhub.com">
                User Forum
              </MessageLink>
            </li>
            <li>
              <MessageLink href="https://d3-slackin.herokuapp.com/">
                D3 Slack
              </MessageLink>{' '}
              #vizhub channel
            </li>
            <li>
              <MessageLink href="https://docs.google.com/forms/d/e/1FAIpQLSc5Wju6Y73RS_wL_UXRDFvKl7NGbsGdt-CBNcAQONHHe3dtvw/viewform?usp=sf_link">
                Datavis 2020 Launch Subscription
              </MessageLink>
            </li>
          </MessageList>
        </MessageSmallText>
      </Message>
    </Right>
  </Wrapper>
);
