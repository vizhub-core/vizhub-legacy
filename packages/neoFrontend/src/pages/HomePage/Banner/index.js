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
  Iframe,
  MessageButton,
} from './styles';

export const Banner = () => (
  <Wrapper>
    <Bar></Bar>
    <Left>
      <Message>
        <MessageSmallText>Learn, practice & teach</MessageSmallText>
        <MessageLargeText>Data Visualization</MessageLargeText>
        <MessageSmallText>with Web technologies.</MessageSmallText>
        <Link to="/create-viz">
          <MessageButton>Get started</MessageButton>
        </Link>
      </Message>
    </Left>
    <Right>
      <Iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/Ia_DwVMXwgk"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></Iframe>
    </Right>
  </Wrapper>
);
