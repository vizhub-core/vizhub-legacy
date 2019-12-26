import React from 'react';
import {
  Wrapper,
  Bar,
  Left,
  Right,
  Message,
  MessageTinyText,
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
                href="https://www.kickstarter.com/projects/curran/vizhub-launch"
                target="_blank"
                rel="noopener noreferrer"
                isRed={true}
              >
                Back the VizHub Launch Kickstarter
              </MessageLink>
            </li>
            <li>
              <MessageLink
                href="https://discourse.vizhub.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                VizHub User Forum
              </MessageLink>
            </li>
            <li>
              <MessageLink
                href="https://d3-slackin.herokuapp.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                D3 Slack
              </MessageLink>{' '}
              #vizhub channel
            </li>
            <li>
              <MessageLink
                href="https://docs.google.com/forms/d/e/1FAIpQLSc5Wju6Y73RS_wL_UXRDFvKl7NGbsGdt-CBNcAQONHHe3dtvw/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datavis 2020 Launch Subscription
              </MessageLink>
            </li>
          </MessageList>
        </MessageSmallText>
        <MessageTinyText>
          Problems with VizHub 2.0? Switch back to the{' '}
          <MessageLink href="https://v1.vizhub.com">old version</MessageLink>.
        </MessageTinyText>
      </Message>
    </Right>
  </Wrapper>
);
