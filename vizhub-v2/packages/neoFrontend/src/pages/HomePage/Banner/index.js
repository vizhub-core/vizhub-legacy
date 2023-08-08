import React from "react";
import { Link } from "react-router-dom";
import { isMobile } from "../../../mobileMods";
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
            Join our online community in the{" "}
            <a href="https://d3js.slack.com/join/shared_invite/zt-1neihq96a-xkXVPXYOmKg8ou7DL3kr7g">
              D3 Slack
            </a>
            , in the <code>#platform-vizhub</code> channel, or use the{" "}
            <a href="https://vizhub.com/forum/">VizHub Forum</a>
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
