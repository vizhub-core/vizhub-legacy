import React from "react";
import { Link } from "react-router-dom";
import { isMobile } from "../../../mobileMods";
import styled from "styled-components";
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
  LeftRight,
} from "./styles";

export const Banner = () => (
  <Wrapper>
    <Gradient />
    <LeftRight>
      <Left>
        <Message>
          <MessageLargeText>Join a Thriving Community</MessageLargeText>
          <MessageSmallText>
            Join the <a href="https://discord.gg/wbtJ7SCtYr">VizHub Discord</a>,
            or check out the{" "}
            <a href="https://vizhub.com/forum/">VizHub Forum</a> to interact
            with the community!
          </MessageSmallText>
          <CallToAction>
            <Link to="/create-viz">
              <MessageButton isFilled>Create Viz</MessageButton>
            </Link>
          </CallToAction>
        </Message>
      </Left>
      <Right>
        <Iframe
          width={isMobile ? "100%" : "400"}
          height="225"
          src="https://www.youtube.com/embed/Ia_DwVMXwgk"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></Iframe>
      </Right>
    </LeftRight>
  </Wrapper>
);
