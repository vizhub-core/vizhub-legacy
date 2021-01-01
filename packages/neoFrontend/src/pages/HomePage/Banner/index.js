import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from '../../../mobileMods';
import {
  Wrapper,
  Gradient,
  Left,
  Right,
  Message,
  MessageSmallText,
  MessageLargeText,
  Iframe,
  MessageButton,
  CallToAction,
} from './styles';

export const Banner = () => (
  <Wrapper>
    <Gradient />
    <Left>
      <Message>
        <MessageLargeText>
          You're minutes away from creating a viz.
        </MessageLargeText>
        <MessageSmallText>
          Learn, practice, teach with one of our{' '}
          <Link to="/create-viz">templates</Link> or start from{' '}
          <Link to="/curran/469e558ba77941aa9e1b416ea521b0aa?edit=files&file=index.html">
            scratch
          </Link>
          .
        </MessageSmallText>
        <CallToAction>
          <Link to="/auth">
            <MessageButton isFilled>Sign in</MessageButton>
          </Link>
        </CallToAction>
      </Message>
    </Left>
    <Right>
      <Iframe
        width={isMobile ? '100%' : '560'}
        height="315"
        src="https://www.youtube.com/embed/Ia_DwVMXwgk"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></Iframe>
    </Right>
  </Wrapper>
);
